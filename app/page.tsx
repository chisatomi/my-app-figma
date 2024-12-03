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

  const onChangefile = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("change");
    const files = e.target.files
    if (files && files[0]) {
      setFile(files[0])
    }
  }

  // アップロードした画像を表示する
  const [profileImage, setProfileImage] = useState("./image.svg");
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
      return
    }
    const formData = new FormData()
    formData.append("file", file)

    await axios.post(`${apiUrl}/api/upload`, formData)
      .then((res) => {
        console.log(res.data)
      })
      .catch((e: AxiosError) => {
        console.error(e)
      })
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
            className="h-max w-max rounded"
          />
          <input
            name="file"
            type="file"
            accept="image/*"
            hidden
            ref={fileInputRef}
            onChange={onChangefile,onFileInputChange}
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