## !!使用前注意

- git clone 後，將 backend 中`.env.template`改為`.env`檔案，之後進行其中相關設定
- `.env`中`DB_XXX`相關設定，需改為你的資料庫、帳號、密碼才能開始使用
- 前端使用 **Next.js**、**Bootstrap**
- 後端為 **Express.js**、**SQL2 Library**
- 資料庫使用**MySQL**

## 安裝與執行

按照以下步驟配置並啟動專案：

1. 克隆此專案：
   ```sh
   git clone https://github.com/Cosmos18338/MFEE57-laptopGuru.git
   cd MFEE57-laptopGuru
   ```
2. 安裝所需依賴(前後端皆須)：
   ```sh
    npm i
   ```
3. 啟動伺服器(前後端皆須)：
   ```sh
   npm run dev
   ```

## 指令

專案 執行:

```sh
npm run dev
```

express 執行&除錯(macOS, linux):

```sh
npm run debug
```

express 執行&除錯(win):

```sh
npm run debug-win
```

## 設計準則 Design Rules

- [SQL Style Guide](https://www.sqlstyle.guide/zh-tw/)
- [Modern SQL Style Guide](https://gist.github.com/mattmc3/38a85e6a4ca1093816c08d4815fbebfb)

### 資料庫 DB

### 資料表名稱 Table Names

- 全英文小寫(以下底線`_`分隔字詞) Lower Case Table Name
- 英文單數詞 Table name in Singular
- 前綴字名稱 Prefixed Table name

### 欄位名稱 Field Names

- 全英文小寫，無空白與數字
- 選擇短名稱，不超過兩個單詞
- 主鍵(Primary key)使用`id`或`資料表名稱_id`
- 避免使用保留字詞，加上前綴字例如 user_name 或 signup_date
- 避免使用相同於資料表名稱
- 避免使用縮寫或簡稱
- 外鍵(Foreign key)欄位需要有資料表名稱加上它們的主鍵，例如 blog_id 代表從資料表 blog 來的外鍵
