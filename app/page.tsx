'use client'
import React, { useRef, useState } from "react";
import { CtaButton } from "./CtaButton";
import { Lockup } from "./Lockup";
import { Table } from "./Table";
import { UploadButton } from "./UploadButton";
import "./style.css";
import axios, { AxiosError } from "axios";
import { headers } from "next/headers";

const apiUrl = 'https://vision.googleapis.com/v1/images:annotate'

export default function MyfirstappSp(): JSX.Element {

  // アップロードボタンをクリックするとファイルアップロードが立ち上がる
  const onClickUploadButton = () => {
    console.log("click");
    return !!fileInputRef.current && fileInputRef.current.click()
  }

  // ファイルを保持できるようにする
  const [file, setFile] = useState<File | null>(null);

  const onChangefile = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("change");
    const files = e.target.files
    if (files && files[0]) {
      setFile(files[0])
    }
  }

  // アップロードした画像を表示する
  const [profileImage, setProfileImage] = useState("/image/noimage.png");
  const fileInputRef = useRef<HTMLInputElement>(null!);

  // const onProfileButtonClick = () =>

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const fileObject = e.target.files[0];
    setProfileImage(window.URL.createObjectURL(fileObject));
  }

  // 送信ボタンを押下してリクエスト送信する
  const onClickSubmit = () => {
    console.log("submit");
    if (!file) {
      return
    }
    const formData = new FormData()
    formData.append("file", file)
    // Base64データに変換
    const imageReader = new FileReader();

    imageReader.addEventListener("load", async function (e) {
      const resultImage = (imageReader.result as string).split(",").slice(1).join(",");
      // URLに送信する
      // const headers = {
      //   headers: {
      //     Authorization: "Bearer: ここにおーそりのいれる",
      //     "x-goog-user-project": "ぷろじぇくとID入れる",
      //     "Content-Type: application/json; charset=utf-8",
      //   }
      // }
      const requestBody = {
        requests: [
          {
            image: {
              content: resultImage
            }
          }, {
            features: {
              "maxResults": 100,
              "type": "IMAGE_PROPERTIES"
            }
          }
        ]

      }
      await axios.post(`${apiUrl}`, requestBody, headers)
      .then((res) => {
        console.log(res.data)
      })
      .catch((e: AxiosError) => {
        console.error(e)
      })
    });
    imageReader.readAsDataURL(file);
  }

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
            className="h-100% w-100% rounded"
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
            <Table
              title="企業ロゴ"
              message="APIで呼ぶもの"
            />
            <Table
              title="要素"
              message="APIで呼ぶもの"
            />
            <Table
              title="カラー"
              message="APIで呼ぶもの"
            />
          </div>
        </div>
      </div>
    </div>
  );
};