'use client'
import React, { useRef, useState } from "react";
import { CtaButton } from "./CtaButton";
import { Lockup } from "./Lockup";
import { Table } from "./Table";
import { UploadButton } from "./UploadButton";
import "./style.css";
import axios, { AxiosError } from "axios";

export default function MyfirstappSp(): JSX.Element {

  // アップロードボタンをクリックするとファイルアップロードが立ち上がる
  const onClickUploadButton = () => {
    console.log("click");
    return !!fileInputRef.current && fileInputRef.current.click()
  }

  // ファイルを保持できるようにする
  const [file, setFile] = useState<File | null>(null);

  const [apiResults, setApiResults] = useState<any>(null);

  const onChangefile = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("change");
    const files = e.target.files
    if (files && files[0]) {
      setFile(files[0])
    }
  }

  // アップロードした画像を表示する
  const [profileImage, setProfileImage] = useState();
  const fileInputRef = useRef<HTMLInputElement>(null!);

  // const onProfileButtonClick = () =>

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const fileObject = e.target.files[0];
    setProfileImage(window.URL.createObjectURL(fileObject));
  }

  // 送信ボタンを押下してリクエスト送信する
  const onClickSubmit = async () => {
    console.log("submit");
    if (!file) {
      console.error("ファイルがせんたくされていません");
      return;
    }

    // ファイルをBase64形式に変換
    const convertToBase64 = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result!.toString().split(",")[1]); // Non-null assertion
        reader.onerror = (error) => reject(error);
      });
    };

    try {
      const base64Image = await convertToBase64(file);

      // Vision API 用リクエストデータ作成
      const requestBody = {
        requests: [
          {
            image: { content: base64Image }, // Base64画像データ
            features: [
              { type: "LABEL_DETECTION", maxResults: 10 }, // 検出タイプと結果数
              { type: "LOGO_DETECTION", maxResults: 5 }, // ここでロゴ検出
              {type: "IMAGE_PROPERTIES" } // ここでカラー情報を指定
            ]
          },
        ],
      };

      // Vision API のエンドポイント
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_CLOUD_VISION_API_KEY;
      if (!apiKey) {
        console.error("環境変数 NEXT_PUBLIC_GOOGLE_CLOUD_VISION_API_KEY が設定されていません");
        return;
      }
      const apiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

      // APIリクエスト送信
      const response = await axios.post(apiUrl, requestBody);

      // 結果をコンソールに出力
      setApiResults(response.data.responses[0]); // 必要な部分を保存
      console.log("Vision API レスポンス:", response.data);
      // カラー情報をデバッグ用に出力
      console.log("カラー情報:", response.data.responses[0]?.imagePropertiesAnnotation?.dominantColors);
    } catch (error) {
      console.error("エラーが発生しました:", error);
    }
  };

  return (
    <div className="myfirstapp-SP">
      <div className="content">
        <div className="upload-2">
          <Lockup
            title="デザインチェッカー"
            keymessage="アップロードされた画像の要素を検索します。" />
          <UploadButton
            className="design-component-instance-node-2"
            hover={false}
            onClick={onClickUploadButton}
          />
          <img
            src={profileImage}
            className="h-full w-full rounded"
          />
          <input
            name="file"
            type="file"
            accept="image/*"
            hidden
            ref={fileInputRef}
            onChange={(e) => { onChangefile(e); onFileInputChange(e); }}
          />
          <CtaButton
            className="design-component-instance-node-2"
            disabled={false}
            hover={false}
            onClick={onClickSubmit}
          />
        </div>

        <div className="output">
          <Lockup
            title="検索結果"
            keymessage="アップロードした画像の要素はこちらでした。"
          />
          <div className="box">
            {apiResults ? (
              <>
                <Table
                  title="企業名"
                  message={apiResults.logoAnnotations?.[0]?.description || "なし"}
                />
                <Table
                  title="要素・製品名"
                  message={apiResults.labelAnnotations?.[0]?.description || "なし"}
                />
                <Table
                  title="使用されているカラー"
                  message={
                    apiResults.imagePropertiesAnnotation?.dominantColors?.colors?.[0]?.color ? (
                      <div
                        style={{
                          display: "inline-block",
                          width: "50px",
                          height: "50px",
                          backgroundColor: `rgb(${apiResults.imagePropertiesAnnotation.dominantColors.colors[0].color.red}, 
                                                   ${apiResults.imagePropertiesAnnotation.dominantColors.colors[0].color.green}, 
                                                   ${apiResults.imagePropertiesAnnotation.dominantColors.colors[0].color.blue})`
                        }}
                      />
                    ) : "なし"
                  }
                />
              </>
            ) : (
              <p>結果がありません。</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};