import React from "react";
import { CtaButton } from "./CtaButton";
import { Lockup } from "./Lockup";
import { Table } from "./Table";
import { UploadButton } from "./UploadButton";
import "./style.css";

export default function MyfirstappSp(): JSX.Element {
  return (
    <div className="myfirstapp-SP">
      <div className="content">
        <div className="upload-2">
          <Lockup
            title="デザインチェッカー"
           keymessage="アップロードされた画像の要素を検索します。"/>
          <UploadButton
            className="design-component-instance-node-2"
            hover={false}
          />
          <CtaButton
            className="design-component-instance-node-2"
            disabled={false}
            hover={false}
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