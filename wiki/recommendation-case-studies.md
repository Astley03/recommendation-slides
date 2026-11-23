# 兩個推薦系統案例：Amazon 商品與 YouTube 影片

第三批正式 Wiki · 依 2026-11-23 人工核准的 v2 發布

本篇討論 2003 年 Amazon 報告與 2016 年 YouTube 論文所描述的方法，引用範圍限於當時公開的設計。

## Amazon 2003：從買過的商品找相似商品

商品對商品協同過濾（item-to-item collaborative filtering）以顧客已購買或評過的商品為起點，查找每件商品的相似商品，再合併成推薦清單。報告中用來比較的使用者式協同過濾（user-based collaborative filtering）會先找行為相近的顧客，再參考這些顧客的商品。兩者比較的對象分別是商品與顧客。〔S04-01｜Recommendation Algorithms，p. 76；Traditional Collaborative Filtering，pp. 76–77；How It Works，p. 78〕

要建立商品關聯，先找出買過某件商品的顧客，再從這些顧客的購買紀錄找出他們還買了哪些商品。研究以這種共購（co-purchase）資料找出有共同購買者的商品對，再計算相似度。這裡的共購以顧客為單位。〔S04-02｜How It Works，pp. 78–79〕

報告舉餘弦相似度（cosine similarity）為例。把每件商品表示為向量（vector），各維對應顧客，資料來自購買紀錄。向量方向越接近，就這項量度而言，兩件商品的購買模式越相似。〔S04-03｜How It Works，p. 79〕

這個做法的擴充性（scalability）來自把耗時的相似商品表預先離線計算（offline computation）。線上（online）提供推薦時，以顧客買過或評過的商品查表並合併結果。依作者對這套設計的分析，線上工作量取決於該顧客的購買與評分項目數，離線建表仍有成本。〔S04-04｜How It Works，p. 79；Scalability: A Comparison，p. 79〕

## YouTube 2016：先找出候選影片，再細緻排序

論文描述兩個神經網路（neural networks）。候選生成（candidate generation）從大型影片庫找出較小的一組相關影片。排序（ranking）為候選影片評分，讓分數較高的影片優先呈現。〔S05-01｜§2，圖 2，PDF p. 2〕

**觀看行為如何參與候選生成？** 觀看是隱式回饋（implicit feedback）。論文在訓練時把看完影片當作正例（positive example），並用觀看歷史作為輸入之一。模型將看過的影片識別碼轉成嵌入向量（embedding vectors），再取平均，以固定長度的向量表示這段歷史。〔S05-02｜§3.1，PDF p. 2；§3.2，圖 3，PDF p. 3〕

**觀看行為如何參與排序？** 排序模型使用曝光（impression）資料，也就是影片曾被呈現給使用者的紀錄。論文對已點擊的曝光依實際觀看時長加權，用來估計每次曝光的預期觀看時長（expected watch time per impression）。模型也能利用影片及使用者與影片關係的特徵評分。〔S05-03｜§4，PDF p. 5；§4.2，PDF p. 7〕

**為什麼分兩階段？** 候選生成先把大量影片縮成較小的集合，排序就能對較少的影片用更多特徵做細部比較。排序還能把不同來源的候選放在一起評分，原始候選分數即使無法直接比較，也能重新排序。〔S05-04｜§2，圖 2，PDF p. 2；§4，PDF p. 5〕

[S04 原文 PDF](https://www.cs.umd.edu/~samir/498/Amazon-Recommendations.pdf) · [S05 原文 PDF 副本](https://fsnagle.org/papers/covington2016youtube.pdf) · [證據卡](../cards/batch-03-evidence.md) · [來源取得紀錄](../raw/batch-03-source-record.md)

## Amazon 與 YouTube 推薦方法比較

Amazon 研究發表於 2003 年，YouTube 研究發表於 2016 年。下表只比較兩篇研究公開描述的方法，無法據此推論兩個平台目前完整的推薦架構。出版資訊見[來源取得紀錄](../raw/batch-03-source-record.md)。

| 比較項目 | Amazon（2003） | YouTube（2016） |
| --- | --- | --- |
| 推薦對象 | 購物型錄中的商品。〔S04-01｜Recommendation Algorithms，p. 76；Traditional Collaborative Filtering，pp. 76–77；How It Works，p. 78〕 | 影片庫中的影片。〔S05-01｜§2，圖 2，PDF p. 2〕 |
| 資料來源 | 用共同購買紀錄找商品關聯，再以個別顧客買過或評過的商品查表。〔S04-02｜How It Works，pp. 78–79〕〔S04-04｜How It Works，p. 79；Scalability: A Comparison，p. 79〕 | 候選生成使用觀看紀錄。排序使用曝光資料，並以實際觀看時長為已點擊的曝光加權。〔S05-02｜§3.1，PDF p. 2；§3.2，圖 3，PDF p. 3〕〔S05-03｜§4，PDF p. 5；§4.2，PDF p. 7〕 |
| 核心方法 | 商品對商品協同過濾。報告以餘弦相似度為例，用顧客的購買行為比較商品。〔S04-01｜Recommendation Algorithms，p. 76；Traditional Collaborative Filtering，pp. 76–77；How It Works，p. 78〕〔S04-03｜How It Works，p. 79〕 | 以兩個神經網路分別做候選生成與排序。文中的排序做法估計每次曝光的預期觀看時長。〔S05-01｜§2，圖 2，PDF p. 2〕〔S05-03｜§4，PDF p. 5；§4.2，PDF p. 7〕 |
| 推薦流程 | 離線建立相似商品表。線上依顧客已買或評過的商品查表並合併結果。〔S04-04｜How It Works，p. 79；Scalability: A Comparison，p. 79〕 | 先從大型影片庫找出較小的候選集合，再為候選影片評分並依分數呈現。〔S05-01｜§2，圖 2，PDF p. 2〕 |
| 主要設計考量 | 將耗時的建表工作放在離線處理，讓線上查詢工作量取決於個別顧客已買或評過的商品數。〔S04-04｜How It Works，p. 79；Scalability: A Comparison，p. 79〕 | 先縮小集合，讓排序能使用更多特徵細緻評分，也能整合原始分數無法直接比較的候選來源。〔S05-04｜§2，圖 2，PDF p. 2；§4，PDF p. 5〕 |
