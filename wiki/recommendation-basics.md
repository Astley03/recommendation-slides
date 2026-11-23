# 推薦系統如何運作？從使用者行為到個人化推薦

第一批正式 Wiki · 依 2026-11-23 人工核准的 v2 發布

## 推薦系統在做什麼？

推薦系統（recommender system）幫助使用者從大量內容中發現可能感興趣的項目，包括原先沒想過要搜尋的內容。〔S01-01｜Why recommendations?〕

推薦可以從不同地方開始。首頁推薦（homepage recommendations）從使用者已知的興趣出發，呈現個人化推薦（personalized recommendations）。相關項目推薦（related item recommendations）從眼前的某個項目出發，呈現與它相似的項目。〔S01-02｜Homepage recommendations、Related item recommendations〕

## 使用者行為怎麼成為推薦資料？

Netflix 會參考多種資訊，估計使用者可能喜歡哪些內容。〔S06-01｜The basics〕

- **使用者互動訊號（user interaction signals）**。觀看紀錄、使用者給出的評分及觀看時長。〔S06-01｜The basics〕
- **內容特徵（content features）**。內容類型、演員及發行年份等描述內容本身的資訊。〔S06-01｜The basics〕

Netflix 也會參考品味相近的會員。〔S06-01｜The basics〕

建立 Netflix 帳號或新增使用者檔案時，可以選幾項喜歡的內容作為推薦起點。跳過時，服務會先顯示多樣且熱門的內容。開始互動後，近期的互動比更早的互動更能影響推薦。〔S06-02｜“Jump starting” the recommendations system〕

## 從候選項目到推薦清單

### Google 課程中的常見架構

Google 的課程介紹一種常見的推薦系統架構，分為以下三個階段。〔S01-03｜Candidate generation；S01-04｜Scoring；S01-05｜Re-ranking〕

1. **候選產生（candidate generation）**。先從大量可選項目縮小到一批候選項目。〔S01-03｜Candidate generation〕
2. **評分（scoring）**。為候選項目打分並排序，以選出可呈現的項目。〔S01-04｜Scoring〕
3. **重新排序（re-ranking）**。加入額外條件調整結果，例如移除使用者明確表示不喜歡的項目，或讓較新的內容更容易排到前面。〔S01-05｜Re-ranking〕

### Netflix 首頁的個人化呈現案例

Netflix 官方公開說明，首頁的個人化可以反映在顯示哪些內容列、每列有哪些項目，以及項目的排列順序。這些資訊描述使用者看到的首頁，無法據此判定 Netflix 的內部系統是否採用 Google 課程所述的三階段架構。〔S06-03｜Rows, rankings and title representation〕

使用者之後開始觀看、看完內容或給出評分時，這些回饋會用來持續更新推薦演算法。〔S06-04｜How we improve our recommendations system〕

## 本批引用

- S01 · Google for Developers 課程。[推薦的用途與類型](https://developers.google.com/machine-learning/recommendation/overview) · [推薦系統架構](https://developers.google.com/machine-learning/recommendation/overview/types)
- S06 · Netflix Help Center。[官方推薦系統說明](https://help.netflix.com/en/node/100639)
- [證據卡與適用條件](../cards/batch-01-evidence.md) · [來源取得紀錄](../raw/batch-01-source-record.md)
