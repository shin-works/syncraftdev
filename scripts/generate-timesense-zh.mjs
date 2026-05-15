import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const root = '/Users/user/dev/syncraftdev/public/timesense';

const localeOrder = ['ja', 'en', 'es', 'de', 'fr', 'ko', 'zh-hant', 'zh-hans'];

const localeInfo = {
  ja: { label: '日本語', aria: '言語を選択' },
  en: { label: 'English', aria: 'Select language' },
  es: { label: 'Español', aria: 'Seleccionar idioma' },
  de: { label: 'Deutsch', aria: 'Sprache auswaehlen' },
  fr: { label: 'Français', aria: 'Sélectionner la langue' },
  ko: { label: '한국어', aria: '언어 선택' },
  'zh-hant': { label: '繁體中文', aria: '選擇語言' },
  'zh-hans': { label: '简体中文', aria: '选择语言' },
};

const zhConfig = {
  'zh-hant': {
    htmlLang: 'zh-Hant',
    dir: 'zh-hant',
    fontHref:
      'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700;900&display=swap',
    fontPrimary:
      "'Noto Sans TC', 'PingFang TC', 'Hiragino Sans CNS', 'Microsoft JhengHei', sans-serif",
    metaDescription:
      'TimeSense 是一款給孩子使用的視覺計時器，搭配語音提醒，幫助孩子更順利地完成早晨準備、就寢與日常轉換。',
    ogTitle: 'TimeSense - 給孩子的語音視覺計時器',
    ogDescription: '用可愛角色溫柔提醒孩子，讓每天的轉換時刻更順暢。',
    title: 'TimeSense - 給孩子的語音視覺計時器',
    replacements: [
      ['Visual Timer for Kids<br>with Voice Reminders', '給孩子的視覺計時器<br>搭配語音提醒'],
      [
        'A gentle visual timer<br>that helps kids manage morning routines, bedtime,<br>and smooth transitions.',
        '用溫柔的視覺計時器<br>幫助孩子面對早晨準備、睡前流程，<br>以及日常轉換更順利。',
      ],
      ['Download on the App Store', '在 App Store 下載'],
      ['Download on the Google Play', '在 Google Play 下載'],
      ['What is TimeSense?', '什麼是 TimeSense？'],
      [
        'TimeSense is a visual timer for kids designed to make daily routines easier. By showing how much time is left and providing calm voice reminders, it helps children handle transitions, morning routines, and bedtime more smoothly. ',
        'TimeSense 是一款專為孩子設計的視覺計時器，讓每天的例行流程更輕鬆。它透過清楚顯示剩餘時間，並搭配平靜溫柔的語音提醒，幫助孩子更順利地面對轉換、早晨準備與睡前時光。',
      ],
      ['Everyday Chaos,<br>Familiar Words...', '每天都兵荒馬亂，<br>這些話是不是很熟悉……'],
      ['"We need to leave—now!"', '「該出門了，現在就要走！」'],
      ['“Only 〇 minutes left? Hurry up!”', '「只剩 〇 分鐘了，快一點！」'],
      ['“You\'re playing again? Why!?”', '「怎麼又跑去玩了！？」'],
      ['“I yelled again... I just wanted to stay calm.”', '「我又忍不住大聲了……明明只想好好說話。」'],
      ['TimeSense gently supports your daily routine', 'TimeSense 用溫柔的方式陪伴日常流程'],
      ['with kindness and encouragement.', '用鼓勵與善意幫助孩子前進。'],
      ['Features of TimeSense', 'TimeSense 的特色'],
      [
        'TimeSense was designed with insights from child psychology and developmental research—to support kids in a way that feels natural and engaging.',
        'TimeSense 融合了兒童心理與發展研究的觀點，讓支援孩子這件事，自然又有吸引力。',
      ],
      ['See the time.<br>Feel the countdown.', '看得見時間，<br>也感受得到倒數。'],
      [
        'The analog clock + timer display allows you to see the remaining time at a glance.',
        '類比時鐘搭配計時器顯示，讓孩子一眼就能看懂還剩多少時間。',
      ],
      ['Character<br>Voice Support', '角色語音<br>溫柔提醒'],
      [
        'Characters speak gently in place of parents—guiding children through countdowns and next steps.',
        '角色會代替家長用溫柔的語氣提醒孩子，陪伴倒數與下一步行動。',
      ],
      ['Character Switching<br>for Morning, Evening, Homework', '依照早晨、夜晚、作業時段<br>切換角色'],
      [
        'Switch characters by time of day—morning, homework, or bedtime—keeping routines fresh and fun.',
        '可以依時段切換不同角色，無論是早晨、作業還是睡前，都讓日常流程保持新鮮有趣。',
      ],
      ['Light Mode', '淺色模式'],
      ['Dark Mode Screen', '深色模式畫面'],
      ['Dark Mode', '深色模式'],
      ['Use Cases', '使用情境'],
      ['"Hurry Up!"<br>Replacement', '取代「快一點！」<br>的早晨助手'],
      [
        'Let the timer and characters take over the morning rush—no more repeating “Hurry up!”',
        '把早晨的催促交給計時器與角色，不必一再重複說「快一點！」。',
      ],
      ['Concentration Switch ON', '專注模式啟動'],
      [
        '“5 minutes left!”—hearing it from a character boosts focus and motivation.',
        '「還剩 5 分鐘喔！」當這句話由角色說出口，更能提升孩子的專注力與動力。',
      ],
      ['Smooth Transitions', '平順切換下一件事'],
      [
        'Struggling with transitions is normal. TimeSense guides kids gently through changes—like cleaning up or moving from play to study.',
        '孩子不擅長轉換節奏很正常。TimeSense 會溫柔陪伴，幫助孩子從玩耍切換到收拾、學習等下一步。',
      ],
      ['Voice Samples', '語音示範'],
      [
        'Choose voice samples that match your child’s mood and needs.<br>\n                From basic countdowns to playful encouragement—each voice is designed to help kids take action smoothly.',
        '依照孩子的個性與情境，挑選適合的語音風格。<br>\n                以下為語音風格示意，目前示例音檔為英文，但能幫助你先感受每個角色的陪伴感。',
      ],
      ['🎵 Free Character Voices', '🎵 免費角色語音'],
      ['These basic voices are available as soon as you download the app.', '下載 App 後即可立即使用這些基礎角色語音。'],
      ['"You\'ve got 30 minutes left."', '「還有 30 分鐘喔。」'],
      ['Daily partner / natural and friendly', '日常陪伴型 / 自然又親切'],
      ['Your browser does not support audio playback', '你的瀏覽器不支援音訊播放'],
      ['"Five minutes! We gotta hurry!"', '「剩下 5 分鐘了，我們要加快囉！」'],
      ['A perfect fit for rushed mornings', '特別適合忙碌的早晨'],
      ['👑 TimeSense+ Premium Voices', '👑 TimeSense+ 進階語音'],
      ['With a premium plan, you’ll unlock extra voices tailored for mornings, bedtime, and homework.', '升級為付費方案後，可解鎖更多適合早晨、睡前與作業時光的角色語音。'],
      ['"Just 5 more! You got this—<br>let’s blast through to the end!"', '「再 5 分鐘！你可以的，<br>一起衝到最後吧！」'],
      ['Hot-blooded big brother in homework mode', '像熱血大哥哥一樣，陪你衝刺作業'],
      ['"Okay... just one more minute.<br>It’s almost bedtime."', '「好喔……只剩 1 分鐘了，<br>差不多要準備睡覺囉。」'],
      ['Gentle voice support from a caring friend', '像溫柔朋友一樣的暖心提醒'],
      ['Download the App', '下載 App'],
      ['Try it for free today!<br>Upgrade to TimeSense+ for full voice selection and an ad-free experience—designed to fit every moment of your child’s day.', '今天就免費試用看看吧！<br>升級為 TimeSense+ 後，可解鎖完整語音選擇與無廣告體驗，陪伴孩子每一個日常時刻。'],
      ['From the Developer', '開發者的話'],
      ['This app was created from our wish to begin each morning with a smile—even during hectic routines and moments when our son found it hard to switch tasks.', '這款 App 的起點，是我們希望即使在忙碌的早晨、即使孩子一時切換不了下一件事，也能帶著笑容開始一天。'],
      ['With a clear display of remaining time and adorable character voices offering gentle prompts, TimeSense acts like a co-parent—speaking on your behalf.</strong></p>', '透過清楚可見的剩餘時間，以及可愛角色溫柔的提醒聲音，TimeSense 就像一位貼心的夥伴，替你把話好好說出口。</strong></p>'],
      ['It’s a timer app built on the ideas of education and kindness, helping kids gradually develop self-direction and time awareness.', '這是一款建立在教育與善意理念上的計時器 App，幫助孩子一步一步培養自主性與時間感。'],
      ['We hope TimeSense can support children and parents all over the world. We’d love to hear your feedback!', '我們希望 TimeSense 能陪伴世界各地的孩子與家長，也很期待收到你的回饋。'],
      ['TimeSense Developer', 'TimeSense 開發團隊'],
      ['Terms of Use', '使用條款'],
      ['Privacy Policy', '隱私權政策'],
      ['Development & Operation', '開發與營運'],
      ['Contact Us', '聯絡我們'],
    ],
    termsReplacements: [
      ['TimeSense - Terms of Use', 'TimeSense - 使用條款'],
      ['<h1>TimeSense Terms of Use</h1>', '<h1>TimeSense 使用條款</h1>'],
      ['Effective Date: April 1, 2025', '生效日期：2025年4月1日'],
      ['Last Updated: May 7, 2026', '最後更新：2026年5月7日'],
      ['These Terms of Use ("Terms") set forth the conditions for using the TimeSense app ("App") provided by SynCraft ("we," "us," or "our").', '本使用條款（以下稱「本條款」）規定了由 SynCraft（以下稱「我們」）提供之 TimeSense 應用程式（以下稱「本應用」）的使用條件。'],
      ['Please read these Terms carefully before using the App, and use the App only if you agree to them.', '在使用本應用前，請先仔細閱讀本條款，並僅於你同意本條款內容時使用本應用。'],
      ['Article 1: Purpose of the App and Intended Users', '第1條：應用程式的目的與預定使用者'],
      ['The App is an educational support app designed to help children develop a sense of time.', '本應用是一款教育支援 App，旨在幫助孩子培養時間感。'],
      ['The App is intended to be used under parental supervision and is not designed for independent use by children under 13 years of age.', '本應用預定於家長監護下使用，並非設計給 13 歲以下兒童獨立使用。'],
      ['Some features and content of the App may vary depending on the operating system, device, platform, or related specifications.', '本應用的部分功能與內容，可能會因作業系統、裝置、平台或相關規格而有所不同。'],
      ['Article 2: Conditions of Use and Prohibited Acts', '第2條：使用條件與禁止事項'],
      ['Users must not engage in any of the following acts:', '使用者不得從事下列行為：'],
      ['Modifying, decompiling, reverse engineering, or otherwise altering the App', '未經授權修改、反編譯、逆向工程或以其他方式變更本應用'],
      ['Reproducing, redistributing, or selling the App or any part of it without permission', '未經授權複製、重新散布或販售本應用或其任何部分'],
      ['Acts that violate laws, regulations, or public order and morals', '違反法律法規、公序良俗的行為'],
      ['Acts that interfere with the operation of the App', '妨礙本應用營運的行為'],
      ['Any other acts that we deem inappropriate', '其他我們認定為不適當的行為'],
      ['Article 3: Intellectual Property Rights', '第3條：智慧財產權'],
      ['All copyrights and other intellectual property rights relating to the characters, illustrations, audio, programs, designs, text, and other content included in the App belong to us or to third parties with legitimate rights.', '本應用中所包含之角色、插圖、音訊、程式、設計、文字及其他內容的著作權與其他智慧財產權，均屬於我們或合法權利人所有。'],
      ['Unauthorized use, reproduction, republication, redistribution, or similar acts are prohibited.', '禁止未經授權使用、複製、再刊載、再散布或其他類似行為。'],
      ['Article 4: Charges and Purchases', '第4條：費用與購買'],
      ['The App is available for basic use free of charge, while some features are offered as paid plans.', '本應用的基本功能可免費使用，部分功能則以付費方案提供。'],
      ['Paid plans may include the following:', '付費方案可能包含以下內容：'],
      ['Monthly subscriptions', '月費訂閱'],
      ['Annual subscriptions', '年費訂閱'],
      ['One-time purchase plans', '一次性購買方案'],
      ['Subscriptions are billed through Google Play or the App Store and renew automatically.', '訂閱將透過 Google Play 或 App Store 計費，並自動續訂。'],
      ['Users may turn off auto-renewal at any time from their account settings in the relevant store.', '使用者可隨時於相應商店的帳戶設定中關閉自動續訂。'],
      ['Even after cancellation, premium features remain available until the end of the current subscription period.', '即使取消訂閱，進階功能仍可使用至當前訂閱期間結束。'],
      ['Billing, cancellations, refunds, and related procedures are handled in accordance with the policies of Google Play or the App Store.', '計費、取消、退款及相關手續，均依 Google Play 或 App Store 的政策辦理。'],
      ['Purchase information and premium features are tied to the account of the platform where the purchase was made, either Google Play or the App Store.', '購買資訊與進階功能將綁定於實際購買的平台帳戶，也就是 Google Play 或 App Store。'],
      ['Purchase status is not shared between the iOS and Android versions.', 'iOS 與 Android 版本之間不會共用購買狀態。'],
      ['Article 5: Advertising', '第5條：廣告'],
      ['Banner advertisements may be displayed in the Android version.', 'Android 版本可能會顯示橫幅廣告。'],
      ['The content and display methods of advertisements may change without prior notice.', '廣告內容與呈現方式可能在未事先通知的情況下變更。'],
      ['Advertisements may be hidden while a premium plan is active.', '啟用進階方案期間，廣告可能會被隱藏。'],
      ['Article 6: Disclaimer', '第6條：免責聲明'],
      ['We do not guarantee that the App will always function properly on all devices and operating system environments, nor do we guarantee its accuracy, safety, or fitness for any particular purpose.', '我們不保證本應用在所有裝置及作業系統環境中都能始終正常運作，也不保證其內容的正確性、安全性或對特定目的之適用性。'],
      ['Some features may become unavailable or stop working properly due to changes in operating systems or device specifications, communication conditions, or changes to external services and development platforms. In particular, after updates, some or all of the App may no longer be available on older devices or operating systems that are no longer supported.', '由於作業系統或裝置規格變更、通訊環境、外部服務及開發平台變動等因素，部分功能可能無法正常提供或使用。特別是在更新後，本應用的全部或部分功能可能無法於較舊裝置或不再支援的作業系統上使用。'],
      ['Data in the App may be stored on your device and may be lost due to app deletion, device changes, malfunctions, operating system updates, or other circumstances.', '本應用中的資料可能儲存在你的裝置內，並可能因刪除 App、更換裝置、故障、作業系統更新或其他情況而遺失。'],
      ['Notifications, timers, alarms, and similar features may also not work as expected depending on device settings or operating system specifications.', '通知、計時器、鬧鐘等功能，也可能因裝置設定或作業系統規格而無法如預期運作。'],
      ['We will make reasonable efforts to provide the App in a stable manner, but we cannot guarantee every outcome related to defects, data loss, functional limitations, or other effects arising from the use of or inability to use the App.', '我們會在合理範圍內努力穩定提供本應用，但對於因使用或無法使用本應用所產生的錯誤、資料遺失、功能限制或其他影響，不保證任何結果。'],
      ['Article 7: Changes to or Termination of the Service', '第7條：服務內容之變更與終止'],
      ['To improve the App, we may add, change, or review its features and content as needed. As a result, some features may be discontinued or may work differently from before.', '為了改善本應用，我們得視需要新增、變更或重新檢討其功能與內容。因此，部分功能可能會停止提供，或與過往的使用方式有所不同。'],
      ['We may also reduce, suspend, or terminate all or part of the App based on development or operational circumstances, supported device conditions, or technical maintenance considerations.', '基於開發或營運狀況、支援裝置條件或技術維護考量，我們也可能縮減、暫停或終止本應用的全部或部分提供。'],
      ['We will make reasonable efforts to improve and continue operating the App in a way that is easy for users to use. For important changes or the end of service, we will provide notice within the App or on our website whenever reasonably possible.', '我們會在合理範圍內持續努力改善並營運本應用，使其更方便使用者使用。若有重大變更或服務終止，我們將盡可能於本應用內或官網公告通知。'],
      ['Article 8: Changes to These Terms', '第8條：本條款之變更'],
      ['We may revise these Terms as necessary.', '我們得視需要修訂本條款。'],
      ['Any revised Terms take effect when posted in the App or on our website.', '修訂後的條款自公布於本應用或我們網站時起生效。'],
      ['Article 9: Voice Synthesis and Credits', '第9條：語音合成與致謝'],
      ['Some Japanese-language audio used in the App is created using voice synthesis technology.', '本應用所使用的部分日文語音，係透過語音合成技術製作。'],
      ['Based on the VOICEVOX terms of use, the following voice libraries are used for Japanese character voices in the App:', '依據 VOICEVOX 的使用條款，本應用中的日文角色語音使用了以下語音庫：'],
      ['The copyrights and licenses for each voice belong to their respective providers.', '各語音的著作權與授權均歸屬於各自的提供者。'],
      ['Unauthorized reproduction, redistribution, or modification of the audio used in the App is prohibited.', '禁止未經授權複製、重新散布或修改本應用所使用的語音。'],
      ['Article 10: Contact', '第10條：聯絡方式'],
      ['Developer and Operator:', '開發與營運：'],
      ['Contact:', '聯絡方式：'],
      ['Return to App Overview', '返回 App 介紹頁'],
    ],
    privacyReplacements: [
      ['TimeSense - Privacy Policy', 'TimeSense - 隱私權政策'],
      ['<h1>TimeSense Privacy Policy</h1>', '<h1>TimeSense 隱私權政策</h1>'],
      ['Effective Date: April 1, 2025', '生效日期：2025年4月1日'],
      ['Last Updated: May 7, 2026', '最後更新：2026年5月7日'],
      ['TimeSense ("the App") respects user privacy and handles personal information in accordance with the policy below.', 'TimeSense（以下稱「本應用」）尊重使用者隱私，並依照以下政策處理個人資訊。'],
      ['This page includes information for both the iOS and Android versions.', '本頁面同時說明 iOS 與 Android 版本的相關資訊。'],
      ['Please review the section relevant to the platform you are using.', '請閱讀與你所使用平台相對應的說明內容。'],
      ['Some features of the App and the external services it uses may vary depending on the platform or operating system.', '本應用的部分功能及其所使用的外部服務，可能會因平台或作業系統而有所不同。'],
      ['1. Information We Collect', '1. 我們蒐集的資訊'],
      ['The App does not collect personally identifiable information such as names, addresses, phone numbers, or email addresses.', '本應用不會蒐集可直接識別個人的資訊，例如姓名、地址、電話號碼或電子郵件地址。'],
      ['However, the following information may be stored locally on the user\'s device:', '不過，以下資訊可能會儲存在使用者的裝置本機中：'],
      ['App settings, such as timer settings and selected voices', 'App 設定，例如計時器設定與已選擇的語音'],
      ['Routine settings', '日常流程設定'],
      ['Usage records, including stamp card history', '使用紀錄，包括集點卡歷程'],
      ['Premium usage status', '進階方案使用狀態'],
      ['This information is primarily stored on the user\'s device.', '這些資訊主要儲存在使用者的裝置上。'],
      ['In the Android version, anonymized statistical data may be sent to external services for usage analysis and app improvement.', '在 Android 版本中，匿名化的統計資料可能會傳送至外部服務，用於使用分析與 App 改善。'],
      ['2. Use of Third-Party Services', '2. 第三方服務的使用'],
      ['■ iOS Version', '■ iOS 版本'],
      ['The iOS version does not use the following external services:', 'iOS 版本不使用以下外部服務：'],
      ['Google AdMob (advertising)', 'Google AdMob（廣告）'],
      ['Firebase Analytics (usage analytics)', 'Firebase Analytics（使用分析）'],
      ['In the iOS version, the app operates primarily on the device and does not send personal information or usage data externally.', '在 iOS 版本中，本應用主要於裝置內運作，不會對外傳送個人資訊或使用資料。'],
      ['■ Android Version', '■ Android 版本'],
      ['The Android version may use the following third-party services for providing and improving the App:', 'Android 版本可能會使用以下第三方服務，以提供並改善本應用：'],
      ['● Google AdMob (Advertising)', '● Google AdMob（廣告）'],
      ['The Android version may display banner advertisements using Google AdMob.', 'Android 版本可能透過 Google AdMob 顯示橫幅廣告。'],
      ['The App is submitted to Google Play as a "Designed for Families" app, and advertisements are delivered in compliance with Google\'s Families policies.', '本應用已以「適合家庭」App 的形式提交至 Google Play，廣告投放也會遵循 Google 的家庭政策。'],
      ['We make reasonable efforts to avoid inappropriate advertisements being shown.', '我們會在合理範圍內盡力避免顯示不適當的廣告。'],
      ['● Firebase Analytics (Usage Analytics)', '● Firebase Analytics（使用分析）'],
      ['The Android version may use Firebase Analytics to improve the App and understand usage trends.', 'Android 版本可能會使用 Firebase Analytics 來改善本應用並了解使用趨勢。'],
      ['Information collected by Firebase Analytics is anonymized statistical data and does not directly identify individuals.', 'Firebase Analytics 所蒐集的資訊為匿名化統計資料，不會直接識別個人身分。'],
      ['Analytics data is sent only when the user has consented, such as on first launch.', '分析資料僅會在使用者同意後傳送，例如首次啟動時。'],
      ['This setting can be changed at any time from within the App\'s settings.', '這項設定可隨時於本應用的設定中變更。'],
      ['3. In-App Purchases', '3. App 內購'],
      ['The App offers in-app purchases through Google Play or the App Store.', '本應用提供透過 Google Play 或 App Store 進行的 App 內購買。'],
      ['Payment processing is handled securely by each store, and the App does not store or collect payment information such as credit card details.', '付款處理由各商店安全處理，本應用不會儲存或蒐集信用卡等付款資訊。'],
      ['Purchase information and premium features are tied to the account on the platform where the purchase was made, either Google Play or the App Store.', '購買資訊與進階功能會綁定於實際購買的平台帳戶，也就是 Google Play 或 App Store。'],
      ['Purchase status is not shared between the iOS and Android versions.', 'iOS 與 Android 版本之間不會共用購買狀態。'],
      ['4. Privacy Policies of External Services', '4. 外部服務的隱私政策'],
      ['Please refer to the following for more information about each service:', '如需了解各項服務的詳細資訊，請參閱以下連結：'],
      ['Google Privacy Policy', 'Google 隱私權政策'],
      ['Apple Privacy Policy', 'Apple 隱私權政策'],
      ['5. Changes to This Privacy Policy', '5. 本隱私權政策的變更'],
      ['This policy may be changed as needed.', '本政策可能會視需要進行變更。'],
      ['Any changes become effective when posted in the App or on our website.', '任何變更自公布於本應用或我們網站時起生效。'],
      ['6. Contact', '6. 聯絡方式'],
      ['Developer and Operator:', '開發與營運：'],
      ['Contact:', '聯絡方式：'],
      ['Return to App Overview', '返回 App 介紹頁'],
    ],
  },
  'zh-hans': {
    htmlLang: 'zh-Hans',
    dir: 'zh-hans',
    fontHref:
      'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap',
    fontPrimary:
      "'Noto Sans SC', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif",
    metaDescription:
      'TimeSense 是一款给孩子使用的视觉计时器，搭配语音提醒，帮助孩子更顺利地完成晨间准备、睡前流程和日常切换。',
    ogTitle: 'TimeSense - 给孩子的语音视觉计时器',
    ogDescription: '用可爱角色温柔提醒孩子，让每天的切换时刻更顺畅。',
    title: 'TimeSense - 给孩子的语音视觉计时器',
    replacements: [
      ['Visual Timer for Kids<br>with Voice Reminders', '给孩子的视觉计时器<br>搭配语音提醒'],
      [
        'A gentle visual timer<br>that helps kids manage morning routines, bedtime,<br>and smooth transitions.',
        '用温柔的视觉计时器<br>帮助孩子面对晨间准备、睡前流程，<br>以及日常切换更顺利。',
      ],
      ['Download on the App Store', '在 App Store 下载'],
      ['Download on the Google Play', '在 Google Play 下载'],
      ['What is TimeSense?', '什么是 TimeSense？'],
      [
        'TimeSense is a visual timer for kids designed to make daily routines easier. By showing how much time is left and providing calm voice reminders, it helps children handle transitions, morning routines, and bedtime more smoothly. ',
        'TimeSense 是一款专为孩子设计的视觉计时器，让每天的日常流程更轻松。它通过清楚显示剩余时间，并搭配平静温柔的语音提醒，帮助孩子更顺利地面对切换、晨间准备与睡前时光。',
      ],
      ['Everyday Chaos,<br>Familiar Words...', '每天都兵荒马乱，<br>这些话是不是很熟悉……'],
      ['"We need to leave—now!"', '“该出门了，现在就得走！”'],
      ['“Only 〇 minutes left? Hurry up!”', '“只剩 〇 分钟了，快一点！”'],
      ['“You\'re playing again? Why!?”', '“怎么又去玩了！？”'],
      ['“I yelled again... I just wanted to stay calm.”', '“我又忍不住吼了……明明只想好好说话。”'],
      ['TimeSense gently supports your daily routine', 'TimeSense 用温柔的方式陪伴日常流程'],
      ['with kindness and encouragement.', '用鼓励与善意帮助孩子前进。'],
      ['Features of TimeSense', 'TimeSense 的特色'],
      [
        'TimeSense was designed with insights from child psychology and developmental research—to support kids in a way that feels natural and engaging.',
        'TimeSense 融合了儿童心理与发展研究的洞察，让支持孩子这件事，自然又有吸引力。',
      ],
      ['See the time.<br>Feel the countdown.', '看得见时间，<br>也感受得到倒计时。'],
      [
        'The analog clock + timer display allows you to see the remaining time at a glance.',
        '模拟时钟搭配计时器显示，让孩子一眼就能看懂还剩多少时间。',
      ],
      ['Character<br>Voice Support', '角色语音<br>温柔提醒'],
      [
        'Characters speak gently in place of parents—guiding children through countdowns and next steps.',
        '角色会代替家长用温柔的语气提醒孩子，陪伴倒计时与下一步行动。',
      ],
      ['Character Switching<br>for Morning, Evening, Homework', '按早晨、夜晚、作业时段<br>切换角色'],
      [
        'Switch characters by time of day—morning, homework, or bedtime—keeping routines fresh and fun.',
        '可以按时段切换不同角色，无论是早晨、作业还是睡前，都让日常流程保持新鲜有趣。',
      ],
      ['Light Mode', '浅色模式'],
      ['Dark Mode Screen', '深色模式画面'],
      ['Dark Mode', '深色模式'],
      ['Use Cases', '使用场景'],
      ['"Hurry Up!"<br>Replacement', '替代“快一点！”<br>的晨间助手'],
      [
        'Let the timer and characters take over the morning rush—no more repeating “Hurry up!”',
        '把早晨的催促交给计时器和角色，不必一遍又一遍地说“快一点！”。',
      ],
      ['Concentration Switch ON', '专注模式启动'],
      [
        '“5 minutes left!”—hearing it from a character boosts focus and motivation.',
        '“还剩 5 分钟哦！”当这句话由角色说出来，更能提升孩子的专注力与动力。',
      ],
      ['Smooth Transitions', '顺畅切换下一件事'],
      [
        'Struggling with transitions is normal. TimeSense guides kids gently through changes—like cleaning up or moving from play to study.',
        '孩子不擅长切换节奏很正常。TimeSense 会温柔陪伴，帮助孩子从玩耍切换到收拾、学习等下一步。',
      ],
      ['Voice Samples', '语音示范'],
      [
        'Choose voice samples that match your child’s mood and needs.<br>\n                From basic countdowns to playful encouragement—each voice is designed to help kids take action smoothly.',
        '按照孩子的个性与情境，挑选合适的语音风格。<br>\n                以下为语音风格示意，目前示例音频为英文，但能帮助你先感受每个角色的陪伴感。',
      ],
      ['🎵 Free Character Voices', '🎵 免费角色语音'],
      ['These basic voices are available as soon as you download the app.', '下载 App 后即可立即使用这些基础角色语音。'],
      ['"You\'ve got 30 minutes left."', '“还剩 30 分钟哦。”'],
      ['Daily partner / natural and friendly', '日常陪伴型 / 自然又亲切'],
      ['Your browser does not support audio playback', '你的浏览器不支持音频播放'],
      ['"Five minutes! We gotta hurry!"', '“还剩 5 分钟，我们要快一点了！”'],
      ['A perfect fit for rushed mornings', '特别适合忙碌的早晨'],
      ['👑 TimeSense+ Premium Voices', '👑 TimeSense+ 进阶语音'],
      ['With a premium plan, you’ll unlock extra voices tailored for mornings, bedtime, and homework.', '升级为付费方案后，可解锁更多适合早晨、睡前与作业时光的角色语音。'],
      ['"Just 5 more! You got this—<br>let’s blast through to the end!"', '“再 5 分钟！你可以的，<br>一起冲到最后吧！”'],
      ['Hot-blooded big brother in homework mode', '像热血大哥哥一样，陪你冲刺作业'],
      ['"Okay... just one more minute.<br>It’s almost bedtime."', '“好哦……只剩 1 分钟了，<br>差不多该准备睡觉啦。”'],
      ['Gentle voice support from a caring friend', '像温柔朋友一样的暖心提醒'],
      ['Download the App', '下载 App'],
      ['Try it for free today!<br>Upgrade to TimeSense+ for full voice selection and an ad-free experience—designed to fit every moment of your child’s day.', '今天就免费试试看吧！<br>升级为 TimeSense+ 后，可解锁完整语音选择与无广告体验，陪伴孩子每一个日常时刻。'],
      ['From the Developer', '开发者的话'],
      ['This app was created from our wish to begin each morning with a smile—even during hectic routines and moments when our son found it hard to switch tasks.', '这款 App 的起点，是我们希望即使在忙碌的早晨、即使孩子一时切换不了下一件事，也能带着笑容开始一天。'],
      ['With a clear display of remaining time and adorable character voices offering gentle prompts, TimeSense acts like a co-parent—speaking on your behalf.</strong></p>', '通过清楚可见的剩余时间，以及可爱角色温柔的提醒声音，TimeSense 就像一位贴心的伙伴，替你把话好好说出口。</strong></p>'],
      ['It’s a timer app built on the ideas of education and kindness, helping kids gradually develop self-direction and time awareness.', '这是一款建立在教育与善意理念上的计时器 App，帮助孩子一步一步培养自主性与时间感。'],
      ['We hope TimeSense can support children and parents all over the world. We’d love to hear your feedback!', '我们希望 TimeSense 能陪伴世界各地的孩子与家长，也很期待收到你的反馈。'],
      ['TimeSense Developer', 'TimeSense 开发团队'],
      ['Terms of Use', '使用条款'],
      ['Privacy Policy', '隐私政策'],
      ['Development & Operation', '开发与运营'],
      ['Contact Us', '联系我们'],
    ],
    termsReplacements: [
      ['TimeSense - Terms of Use', 'TimeSense - 使用条款'],
      ['<h1>TimeSense Terms of Use</h1>', '<h1>TimeSense 使用条款</h1>'],
      ['Effective Date: April 1, 2025', '生效日期：2025年4月1日'],
      ['Last Updated: May 7, 2026', '最后更新：2026年5月7日'],
      ['These Terms of Use ("Terms") set forth the conditions for using the TimeSense app ("App") provided by SynCraft ("we," "us," or "our").', '本使用条款（以下简称“本条款”）规定了由 SynCraft（以下简称“我们”）提供的 TimeSense 应用程序（以下简称“本应用”）的使用条件。'],
      ['Please read these Terms carefully before using the App, and use the App only if you agree to them.', '在使用本应用前，请先仔细阅读本条款，并仅在你同意本条款内容时使用本应用。'],
      ['Article 1: Purpose of the App and Intended Users', '第1条：应用程序的目的与预定使用者'],
      ['The App is an educational support app designed to help children develop a sense of time.', '本应用是一款教育支持 App，旨在帮助孩子培养时间感。'],
      ['The App is intended to be used under parental supervision and is not designed for independent use by children under 13 years of age.', '本应用预定在家长监护下使用，并非设计给 13 岁以下儿童独立使用。'],
      ['Some features and content of the App may vary depending on the operating system, device, platform, or related specifications.', '本应用的部分功能与内容，可能会因操作系统、设备、平台或相关规格而有所不同。'],
      ['Article 2: Conditions of Use and Prohibited Acts', '第2条：使用条件与禁止事项'],
      ['Users must not engage in any of the following acts:', '用户不得从事下列行为：'],
      ['Modifying, decompiling, reverse engineering, or otherwise altering the App', '未经授权修改、反编译、逆向工程或以其他方式变更本应用'],
      ['Reproducing, redistributing, or selling the App or any part of it without permission', '未经授权复制、重新分发或出售本应用或其任何部分'],
      ['Acts that violate laws, regulations, or public order and morals', '违反法律法规、公序良俗的行为'],
      ['Acts that interfere with the operation of the App', '妨碍本应用运营的行为'],
      ['Any other acts that we deem inappropriate', '其他我们认定为不适当的行为'],
      ['Article 3: Intellectual Property Rights', '第3条：知识产权'],
      ['All copyrights and other intellectual property rights relating to the characters, illustrations, audio, programs, designs, text, and other content included in the App belong to us or to third parties with legitimate rights.', '本应用中所包含的角色、插图、音频、程序、设计、文字及其他内容的著作权与其他知识产权，均归我们或合法权利人所有。'],
      ['Unauthorized use, reproduction, republication, redistribution, or similar acts are prohibited.', '禁止未经授权使用、复制、转载、再分发或其他类似行为。'],
      ['Article 4: Charges and Purchases', '第4条：费用与购买'],
      ['The App is available for basic use free of charge, while some features are offered as paid plans.', '本应用的基础功能可免费使用，部分功能则以付费方案提供。'],
      ['Paid plans may include the following:', '付费方案可能包含以下内容：'],
      ['Monthly subscriptions', '月度订阅'],
      ['Annual subscriptions', '年度订阅'],
      ['One-time purchase plans', '一次性购买方案'],
      ['Subscriptions are billed through Google Play or the App Store and renew automatically.', '订阅将通过 Google Play 或 App Store 计费，并自动续订。'],
      ['Users may turn off auto-renewal at any time from their account settings in the relevant store.', '用户可随时在相应商店的账户设置中关闭自动续订。'],
      ['Even after cancellation, premium features remain available until the end of the current subscription period.', '即使取消订阅，进阶功能仍可使用至当前订阅周期结束。'],
      ['Billing, cancellations, refunds, and related procedures are handled in accordance with the policies of Google Play or the App Store.', '计费、取消、退款及相关手续，均按照 Google Play 或 App Store 的政策办理。'],
      ['Purchase information and premium features are tied to the account of the platform where the purchase was made, either Google Play or the App Store.', '购买信息与进阶功能将绑定到实际购买的平台账户，也就是 Google Play 或 App Store。'],
      ['Purchase status is not shared between the iOS and Android versions.', 'iOS 与 Android 版本之间不会共享购买状态。'],
      ['Article 5: Advertising', '第5条：广告'],
      ['Banner advertisements may be displayed in the Android version.', 'Android 版本可能会显示横幅广告。'],
      ['The content and display methods of advertisements may change without prior notice.', '广告内容与展示方式可能在未事先通知的情况下变更。'],
      ['Advertisements may be hidden while a premium plan is active.', '启用进阶方案期间，广告可能会被隐藏。'],
      ['Article 6: Disclaimer', '第6条：免责声明'],
      ['We do not guarantee that the App will always function properly on all devices and operating system environments, nor do we guarantee its accuracy, safety, or fitness for any particular purpose.', '我们不保证本应用在所有设备及操作系统环境中都能始终正常运行，也不保证其内容的准确性、安全性或对特定目的的适用性。'],
      ['Some features may become unavailable or stop working properly due to changes in operating systems or device specifications, communication conditions, or changes to external services and development platforms. In particular, after updates, some or all of the App may no longer be available on older devices or operating systems that are no longer supported.', '由于操作系统或设备规格变更、通信环境、外部服务及开发平台变动等因素，部分功能可能无法正常提供或使用。尤其在更新后，本应用的全部或部分功能可能无法在较旧设备或不再支持的操作系统上使用。'],
      ['Data in the App may be stored on your device and may be lost due to app deletion, device changes, malfunctions, operating system updates, or other circumstances.', '本应用中的数据可能存储在你的设备中，并可能因删除 App、更换设备、故障、操作系统更新或其他情况而丢失。'],
      ['Notifications, timers, alarms, and similar features may also not work as expected depending on device settings or operating system specifications.', '通知、计时器、闹钟等功能，也可能因设备设置或操作系统规格而无法如预期运行。'],
      ['We will make reasonable efforts to provide the App in a stable manner, but we cannot guarantee every outcome related to defects, data loss, functional limitations, or other effects arising from the use of or inability to use the App.', '我们会在合理范围内努力稳定提供本应用，但对于因使用或无法使用本应用所产生的错误、数据丢失、功能限制或其他影响，不保证任何结果。'],
      ['Article 7: Changes to or Termination of the Service', '第7条：服务内容的变更与终止'],
      ['To improve the App, we may add, change, or review its features and content as needed. As a result, some features may be discontinued or may work differently from before.', '为了改善本应用，我们可视需要新增、变更或重新审视其功能与内容。因此，部分功能可能会停止提供，或与以往的使用方式有所不同。'],
      ['We may also reduce, suspend, or terminate all or part of the App based on development or operational circumstances, supported device conditions, or technical maintenance considerations.', '基于开发或运营状况、支持设备条件或技术维护考量，我们也可能缩减、暂停或终止本应用的全部或部分提供。'],
      ['We will make reasonable efforts to improve and continue operating the App in a way that is easy for users to use. For important changes or the end of service, we will provide notice within the App or on our website whenever reasonably possible.', '我们会在合理范围内持续努力改善并运营本应用，使其更方便用户使用。若有重大变更或服务终止，我们将尽可能在本应用内或官网公告通知。'],
      ['Article 8: Changes to These Terms', '第8条：本条款的变更'],
      ['We may revise these Terms as necessary.', '我们可视需要修订本条款。'],
      ['Any revised Terms take effect when posted in the App or on our website.', '修订后的条款自公布于本应用或我们网站时起生效。'],
      ['Article 9: Voice Synthesis and Credits', '第9条：语音合成与致谢'],
      ['Some Japanese-language audio used in the App is created using voice synthesis technology.', '本应用所使用的部分日语语音，系通过语音合成技术制作。'],
      ['Based on the VOICEVOX terms of use, the following voice libraries are used for Japanese character voices in the App:', '根据 VOICEVOX 的使用条款，本应用中的日语角色语音使用了以下语音库：'],
      ['The copyrights and licenses for each voice belong to their respective providers.', '各语音的著作权与授权均归属于各自的提供者。'],
      ['Unauthorized reproduction, redistribution, or modification of the audio used in the App is prohibited.', '禁止未经授权复制、再分发或修改本应用所使用的语音。'],
      ['Article 10: Contact', '第10条：联系方式'],
      ['Developer and Operator:', '开发与运营：'],
      ['Contact:', '联系方式：'],
      ['Return to App Overview', '返回 App 介绍页'],
    ],
    privacyReplacements: [
      ['TimeSense - Privacy Policy', 'TimeSense - 隐私政策'],
      ['<h1>TimeSense Privacy Policy</h1>', '<h1>TimeSense 隐私政策</h1>'],
      ['Effective Date: April 1, 2025', '生效日期：2025年4月1日'],
      ['Last Updated: May 7, 2026', '最后更新：2026年5月7日'],
      ['TimeSense ("the App") respects user privacy and handles personal information in accordance with the policy below.', 'TimeSense（以下简称“本应用”）尊重用户隐私，并按照以下政策处理个人信息。'],
      ['This page includes information for both the iOS and Android versions.', '本页面同时说明 iOS 与 Android 版本的相关信息。'],
      ['Please review the section relevant to the platform you are using.', '请阅读与你所使用平台相对应的说明内容。'],
      ['Some features of the App and the external services it uses may vary depending on the platform or operating system.', '本应用的部分功能及其所使用的外部服务，可能会因平台或操作系统而有所不同。'],
      ['1. Information We Collect', '1. 我们收集的信息'],
      ['The App does not collect personally identifiable information such as names, addresses, phone numbers, or email addresses.', '本应用不会收集可直接识别个人的信息，例如姓名、地址、电话号码或电子邮箱地址。'],
      ['However, the following information may be stored locally on the user\'s device:', '不过，以下信息可能会存储在用户设备的本地：'],
      ['App settings, such as timer settings and selected voices', 'App 设置，例如计时器设置与已选择的语音'],
      ['Routine settings', '日常流程设置'],
      ['Usage records, including stamp card history', '使用记录，包括集点卡历史'],
      ['Premium usage status', '进阶方案使用状态'],
      ['This information is primarily stored on the user\'s device.', '这些信息主要存储在用户的设备上。'],
      ['In the Android version, anonymized statistical data may be sent to external services for usage analysis and app improvement.', '在 Android 版本中，匿名化的统计数据可能会发送至外部服务，用于使用分析与 App 改进。'],
      ['2. Use of Third-Party Services', '2. 第三方服务的使用'],
      ['■ iOS Version', '■ iOS 版本'],
      ['The iOS version does not use the following external services:', 'iOS 版本不使用以下外部服务：'],
      ['Google AdMob (advertising)', 'Google AdMob（广告）'],
      ['Firebase Analytics (usage analytics)', 'Firebase Analytics（使用分析）'],
      ['In the iOS version, the app operates primarily on the device and does not send personal information or usage data externally.', '在 iOS 版本中，本应用主要在设备内运行，不会对外发送个人信息或使用数据。'],
      ['■ Android Version', '■ Android 版本'],
      ['The Android version may use the following third-party services for providing and improving the App:', 'Android 版本可能会使用以下第三方服务，以提供并改进本应用：'],
      ['● Google AdMob (Advertising)', '● Google AdMob（广告）'],
      ['The Android version may display banner advertisements using Google AdMob.', 'Android 版本可能通过 Google AdMob 显示横幅广告。'],
      ['The App is submitted to Google Play as a "Designed for Families" app, and advertisements are delivered in compliance with Google\'s Families policies.', '本应用已以“适合家庭”App 的形式提交至 Google Play，广告投放也会遵循 Google 的家庭政策。'],
      ['We make reasonable efforts to avoid inappropriate advertisements being shown.', '我们会在合理范围内尽力避免展示不适当的广告。'],
      ['● Firebase Analytics (Usage Analytics)', '● Firebase Analytics（使用分析）'],
      ['The Android version may use Firebase Analytics to improve the App and understand usage trends.', 'Android 版本可能会使用 Firebase Analytics 来改进本应用并了解使用趋势。'],
      ['Information collected by Firebase Analytics is anonymized statistical data and does not directly identify individuals.', 'Firebase Analytics 所收集的信息为匿名化统计数据，不会直接识别个人身份。'],
      ['Analytics data is sent only when the user has consented, such as on first launch.', '分析数据仅会在用户同意后发送，例如首次启动时。'],
      ['This setting can be changed at any time from within the App\'s settings.', '这项设置可随时在本应用的设置中更改。'],
      ['3. In-App Purchases', '3. App 内购'],
      ['The App offers in-app purchases through Google Play or the App Store.', '本应用提供通过 Google Play 或 App Store 进行的 App 内购买。'],
      ['Payment processing is handled securely by each store, and the App does not store or collect payment information such as credit card details.', '付款处理由各商店安全完成，本应用不会存储或收集信用卡等支付信息。'],
      ['Purchase information and premium features are tied to the account on the platform where the purchase was made, either Google Play or the App Store.', '购买信息与进阶功能会绑定到实际购买的平台账户，也就是 Google Play 或 App Store。'],
      ['Purchase status is not shared between the iOS and Android versions.', 'iOS 与 Android 版本之间不会共享购买状态。'],
      ['4. Privacy Policies of External Services', '4. 外部服务的隐私政策'],
      ['Please refer to the following for more information about each service:', '如需了解各项服务的详细信息，请参阅以下链接：'],
      ['Google Privacy Policy', 'Google 隐私政策'],
      ['Apple Privacy Policy', 'Apple 隐私政策'],
      ['5. Changes to This Privacy Policy', '5. 本隐私政策的变更'],
      ['This policy may be changed as needed.', '本政策可能会视需要进行变更。'],
      ['Any changes become effective when posted in the App or on our website.', '任何变更自公布于本应用或我们网站时起生效。'],
      ['6. Contact', '6. 联系方式'],
      ['Developer and Operator:', '开发与运营：'],
      ['Contact:', '联系方式：'],
      ['Return to App Overview', '返回 App 介绍页'],
    ],
  },
};

function mustReplace(content, from, to, fileLabel) {
  if (!content.includes(from)) {
    throw new Error(`Could not find replacement target in ${fileLabel}: ${from.slice(0, 80)}`);
  }
  return content.split(from).join(to);
}

function replaceAll(content, replacements, fileLabel) {
  let next = content;
  for (const [from, to] of replacements) {
    next = mustReplace(next, from, to, fileLabel);
  }
  return next;
}

function localeUrl(lang, kind) {
  const suffix = kind === 'index' ? '' : `${kind}/`;
  if (lang === 'ja') {
    return `https://syncraft.dev/timesense/${suffix}`;
  }
  return `https://syncraft.dev/timesense/${lang}/${suffix}`;
}

function alternateBlock(kind) {
  const lines = localeOrder.map((lang) => {
    const hreflang = lang === 'zh-hant' ? 'zh-Hant' : lang === 'zh-hans' ? 'zh-Hans' : lang;
    return `    <link rel="alternate" hreflang="${hreflang}" href="${localeUrl(lang, kind)}">`;
  });
  lines.push(`    <link rel="alternate" hreflang="x-default" href="${localeUrl('ja', kind)}">`);
  return lines.join('\n');
}

function languageToggleBlock(kind, currentLang) {
  const aria = localeInfo[currentLang].aria;
  const options = localeOrder
    .map((lang) => {
      const selected = lang === currentLang ? ' selected' : '';
      return `            <option value="${localeUrl(lang, kind)}"${selected}>${localeInfo[lang].label}</option>`;
    })
    .join('\n');

  return [
    '    <div class="language-toggle">',
    `        <select aria-label="${aria}" onchange="if (this.value) window.location.href=this.value;">`,
    options,
    '        </select>',
    '    </div>',
  ].join('\n');
}

function updateSharedNav(content, kind, currentLang, fileLabel) {
  let next = content.replace(
    /<link rel="alternate" hreflang="ja"[\s\S]*?<link rel="alternate" hreflang="x-default" href="[^"]+">/,
    alternateBlock(kind),
  );

  next = next.replace(/<div class="language-toggle">[\s\S]*?<\/div>/, languageToggleBlock(kind, currentLang));

  if (next === content) {
    throw new Error(`Shared nav replacement failed for ${fileLabel}`);
  }

  return next;
}

function writeFile(relativePath, content) {
  const filePath = join(root, relativePath);
  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, content);
}

const baseIndex = readFileSync(join(root, 'en/index.html'), 'utf8');
const baseTerms = readFileSync(join(root, 'en/terms/index.html'), 'utf8');
const basePrivacy = readFileSync(join(root, 'en/privacy/index.html'), 'utf8');

for (const [lang, cfg] of Object.entries(zhConfig)) {
  let indexContent = baseIndex;
  indexContent = mustReplace(indexContent, '<html lang="en">', `<html lang="${cfg.htmlLang}">`, `${lang}/index`);
  indexContent = mustReplace(indexContent, 'https://syncraft.dev/timesense/en/', `https://syncraft.dev/timesense/${cfg.dir}/`, `${lang}/index`);
  indexContent = mustReplace(indexContent, '<meta name="description" content="TimeSense is a smart voice timer app that helps children manage time in a fun way. Characters gently remind them of what’s next.">', `<meta name="description" content="${cfg.metaDescription}">`, `${lang}/index`);
  indexContent = mustReplace(indexContent, '<meta property="og:title" content="TimeSense - Voice Timer for Kids">', `<meta property="og:title" content="${cfg.ogTitle}">`, `${lang}/index`);
  indexContent = mustReplace(indexContent, '<meta property="og:description" content="No more rushing! Cute characters gently guide your child through routines like getting ready, studying, and going out.">', `<meta property="og:description" content="${cfg.ogDescription}">`, `${lang}/index`);
  indexContent = mustReplace(indexContent, '<title>TimeSense - Voice Timer for Kids</title>', `<title>${cfg.title}</title>`, `${lang}/index`);
  indexContent = mustReplace(indexContent, '<link href="https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@300;400;500;700;800&display=swap" rel="stylesheet">', `<link href="${cfg.fontHref}" rel="stylesheet">`, `${lang}/index`);
  indexContent = updateSharedNav(indexContent, 'index', lang, `${lang}/index`);
  indexContent = mustReplace(indexContent, "--font-primary: 'M PLUS Rounded 1c', sans-serif;", `--font-primary: ${cfg.fontPrimary};`, `${lang}/index`);
  indexContent = mustReplace(indexContent, 'Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg', '../en/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg', `${lang}/index`);
  indexContent = mustReplace(indexContent, 'GetItOnGooglePlay_Badge_Web_color_English.png', '../en/GetItOnGooglePlay_Badge_Web_color_English.png', `${lang}/index`);
  indexContent = mustReplace(indexContent, 'luma_30minleft_en.png', '../en/luma_30minleft_en.png', `${lang}/index`);
  indexContent = mustReplace(indexContent, 'src="luma_30min.mp3"', 'src="../en/luma_30min.mp3"', `${lang}/index`);
  indexContent = mustReplace(indexContent, 'src="pico_nor_5min.mp3"', 'src="../en/pico_nor_5min.mp3"', `${lang}/index`);
  indexContent = mustReplace(indexContent, 'src="milo_5min.mp3"', 'src="../en/milo_5min.mp3"', `${lang}/index`);
  indexContent = mustReplace(indexContent, 'src="toto_1min.mp3"', 'src="../en/toto_1min.mp3"', `${lang}/index`);
  indexContent = replaceAll(indexContent, cfg.replacements, `${lang}/index`);
  writeFile(`${cfg.dir}/index.html`, indexContent);

  let termsContent = baseTerms;
  termsContent = mustReplace(termsContent, '<html lang="en">', `<html lang="${cfg.htmlLang}">`, `${lang}/terms`);
  termsContent = mustReplace(termsContent, 'https://syncraft.dev/timesense/en/terms/', `https://syncraft.dev/timesense/${cfg.dir}/terms/`, `${lang}/terms`);
  termsContent = updateSharedNav(termsContent, 'terms', lang, `${lang}/terms`);
  termsContent = replaceAll(termsContent, cfg.termsReplacements, `${lang}/terms`);
  termsContent = mustReplace(termsContent, 'https://syncraft.dev/timesense/en/" class="button"', `https://syncraft.dev/timesense/${cfg.dir}/" class="button"`, `${lang}/terms`);
  writeFile(`${cfg.dir}/terms/index.html`, termsContent);

  let privacyContent = basePrivacy;
  privacyContent = mustReplace(privacyContent, '<html lang="en">', `<html lang="${cfg.htmlLang}">`, `${lang}/privacy`);
  privacyContent = mustReplace(privacyContent, 'https://syncraft.dev/timesense/en/privacy/', `https://syncraft.dev/timesense/${cfg.dir}/privacy/`, `${lang}/privacy`);
  privacyContent = updateSharedNav(privacyContent, 'privacy', lang, `${lang}/privacy`);
  privacyContent = replaceAll(privacyContent, cfg.privacyReplacements, `${lang}/privacy`);
  privacyContent = mustReplace(privacyContent, 'https://syncraft.dev/timesense/en/" class="button"', `https://syncraft.dev/timesense/${cfg.dir}/" class="button"`, `${lang}/privacy`);
  writeFile(`${cfg.dir}/privacy/index.html`, privacyContent);
}

const existingIndexPages = [
  ['index.html', 'ja'],
  ['en/index.html', 'en'],
  ['es/index.html', 'es'],
  ['de/index.html', 'de'],
  ['fr/index.html', 'fr'],
  ['ko/index.html', 'ko'],
];

const existingLegalPages = [
  ['terms/index.html', 'ja', 'terms'],
  ['privacy/index.html', 'ja', 'privacy'],
  ['en/terms/index.html', 'en', 'terms'],
  ['en/privacy/index.html', 'en', 'privacy'],
  ['es/terms/index.html', 'es', 'terms'],
  ['es/privacy/index.html', 'es', 'privacy'],
  ['de/terms/index.html', 'de', 'terms'],
  ['de/privacy/index.html', 'de', 'privacy'],
  ['fr/terms/index.html', 'fr', 'terms'],
  ['fr/privacy/index.html', 'fr', 'privacy'],
  ['ko/terms/index.html', 'ko', 'terms'],
  ['ko/privacy/index.html', 'ko', 'privacy'],
];

for (const [relativePath, lang] of existingIndexPages) {
  const filePath = join(root, relativePath);
  let content = readFileSync(filePath, 'utf8');
  content = updateSharedNav(content, 'index', lang, relativePath);
  writeFile(relativePath, content);
}

for (const [relativePath, lang, kind] of existingLegalPages) {
  const filePath = join(root, relativePath);
  let content = readFileSync(filePath, 'utf8');
  content = updateSharedNav(content, kind, lang, relativePath);
  writeFile(relativePath, content);
}

console.log('Generated TimeSense zh-Hant/zh-Hans pages and updated language navigation.');
