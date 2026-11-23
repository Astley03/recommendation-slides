# 推薦系統入門：五項知識補充

正式 Wiki · 依 2026-11-23 人工核准的補充草稿 v1 發布

## 搜尋與推薦的差異

搜尋（search）通常從使用者主動提出的查詢（query）開始。推薦（recommendation）則可以在使用者沒有輸入查詢時，依已知興趣主動呈現可能有用的項目，讓使用者發現原本沒想到要找的內容。〔S06-05｜The basics、“Jump starting” the recommendations system〕〔S01-06｜Recommendations: what and why? › Homepage recommendations、Why recommendations?〕

例如，輸入片名找影片是搜尋，打開首頁就看到可能喜歡的影片是推薦。這是兩個起點的教學對照。〔S06-05｜The basics、“Jump starting” the recommendations system〕〔S01-06｜Recommendations: what and why? › Homepage recommendations、Why recommendations?〕

## 內容式推薦

內容式推薦（content-based filtering）可根據使用者先前的行為或明示偏好，找出特徵相近的項目。以自製教學例來說，若讀者收藏了標有「推理」的書，可以把其他書的主題標籤與這項偏好比對，優先推薦也帶有「推理」標籤的書。〔S01-07｜Content-based filtering › 正文開頭、Using dot product as a similarity measure〕

若總是從已有興趣找相似項目，系統探索其他主題的能力可能有限。〔S01-08｜Content-based filtering advantages & disadvantages › Disadvantages〕

## 混合式推薦

混合式推薦（hybrid recommendation）把不同的推薦方法組合起來。S03 綜述中的 P-Tango 就分別取得協同過濾（collaborative filtering）和內容式推薦的結果，再給兩者權重（weights）。它起初讓兩種方法的權重相同，後續依預測獲得確認或否定的情況調整。〔S03-07｜§5，pp. 11–12；§5.2，p. 12〕

## 冷啟動

冷啟動（cold start）是資料稀疏（data sparsity）的一種情境。**新使用者**剛加入時，系統缺少他評過或買過什麼的歷史，難以推估其偏好。**新項目**剛加入時，系統缺少其他人對該項目的評分，難以從評分推估它與既有項目的關聯。這兩種情境會影響仰賴互動歷史的協同過濾。〔S03-08｜§2.1，pp. 2–3〕

Netflix 的公開說明提供一個新使用者案例。建立帳號或新增檔案時，可以選幾項喜歡的內容；略過時，服務先提供多樣且熱門的內容。這個例子描述使用者看得到的起始流程。〔S06-05｜The basics、“Jump starting” the recommendations system〕

## 推薦多樣性

相關性（relevance）關心個別項目是否符合使用者的興趣；多樣性（diversity）則關心清單中的項目是否彼此過於相似。Google 課程指出，若只挑最接近查詢的項目，清單可能充滿同類影片。重新排序（re-ranking）可以納入影片類型，讓清單包含更多類別。〔S01-09｜Re-ranking › Diversity、Solutions〕

以課程的貓頭鷹影片情境延伸做教學示意：若原先分數最高的影片全是貓頭鷹，讓一部原分數稍低的其他野生動物影片進入清單，會增加主題多樣性，也會讓一部原相似度較高的影片讓出位置。這是可能的取捨，實際結果取決於候選內容及排序方式。〔S01-09｜Re-ranking › Diversity、Solutions〕

[補充證據卡](../cards/wiki-supplement-evidence.md) · [來源定位紀錄](../raw/wiki-supplement-source-record.md)
