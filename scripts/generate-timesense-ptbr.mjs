import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const root = '/Users/user/dev/syncraftdev/public/timesense';

const localeOrder = ['ja', 'en', 'es', 'de', 'fr', 'pt-br', 'ko', 'zh-hant', 'zh-hans'];

const localeInfo = {
  ja: { label: '日本語', aria: '言語を選択' },
  en: { label: 'English', aria: 'Select language' },
  es: { label: 'Español', aria: 'Seleccionar idioma' },
  de: { label: 'Deutsch', aria: 'Sprache auswaehlen' },
  fr: { label: 'Français', aria: 'Sélectionner la langue' },
  'pt-br': { label: 'Português (Brasil)', aria: 'Selecionar idioma' },
  ko: { label: '한국어', aria: '언어 선택' },
  'zh-hant': { label: '繁體中文', aria: '選擇語言' },
  'zh-hans': { label: '简体中文', aria: '选择语言' },
};

const ptBrConfig = {
  htmlLang: 'pt-BR',
  dir: 'pt-br',
  metaDescription:
    'TimeSense e um timer visual com lembretes por voz que ajuda criancas a acompanhar a rotina com mais tranquilidade e autonomia.',
  ogTitle: 'TimeSense - Timer visual com voz para criancas',
  ogDescription:
    'Personagens fofos ajudam seu filho a acompanhar a rotina, estudar e sair de casa com avisos gentis.',
  title: 'TimeSense - Timer visual com voz para criancas',
  replacements: [
    ['Visual Timer for Kids<br>with Voice Reminders', 'Timer visual para criancas<br>com lembretes por voz'],
    [
      'A gentle visual timer<br>that helps kids manage morning routines, bedtime,<br>and smooth transitions.',
      'Um timer visual acolhedor<br>que ajuda as criancas com a rotina da manha, a hora de dormir<br>e as transicoes do dia a dia.',
    ],
    ['Download on the App Store', 'Baixar na App Store'],
    ['Download on the Google Play', 'Disponivel no Google Play'],
    ['What is TimeSense?', 'O que e o TimeSense?'],
    [
      'TimeSense is a visual timer for kids designed to make daily routines easier. By showing how much time is left and providing calm voice reminders, it helps children handle transitions, morning routines, and bedtime more smoothly. ',
      'TimeSense e um timer visual infantil criado para deixar a rotina mais leve. Ao mostrar quanto tempo falta e usar lembretes por voz com calma, ele ajuda as criancas a lidar melhor com transicoes, rotina da manha e hora de dormir. ',
    ],
    ['Everyday Chaos,<br>Familiar Words...', 'Correria de todo dia,<br>frases que voce conhece bem...'],
    ['"We need to leave—now!"', '"Precisamos sair agora!"'],
    ['“Only 〇 minutes left? Hurry up!”', '"So faltam 〇 minutos! Vamos!"'],
    ['“You\'re playing again? Why!?”', '"Voce foi brincar de novo? Por que?"'],
    ['“I yelled again... I just wanted to stay calm.”', '"Eu acabei gritando de novo... so queria manter a calma."'],
    ['TimeSense gently supports your daily routine', 'TimeSense acompanha a rotina'],
    ['with kindness and encouragement.', 'com gentileza e incentivo.'],
    ['Features of TimeSense', 'Recursos do TimeSense'],
    [
      'TimeSense was designed with insights from child psychology and developmental research—to support kids in a way that feels natural and engaging.',
      'TimeSense foi pensado com base em psicologia infantil e estudos do desenvolvimento, para apoiar as criancas de um jeito natural e envolvente.',
    ],
    ['See the time.<br>Feel the countdown.', 'Veja o tempo.<br>Sinta a contagem.'],
    [
      'The analog clock + timer display allows you to see the remaining time at a glance.',
      'O relogio analogico junto com o timer ajuda a entender rapidamente quanto tempo ainda falta.',
    ],
    ['Character<br>Voice Support', 'Personagens com<br>avisos por voz'],
    [
      'Characters speak gently in place of parents—guiding children through countdowns and next steps.',
      'Os personagens falam com carinho no lugar dos adultos, guiando a crianca na contagem e no proximo passo.',
    ],
    ['Character Switching<br>for Morning, Evening, Homework', 'Troque de personagem<br>para manha, tarefas e noite'],
    [
      'Switch characters by time of day—morning, homework, or bedtime—keeping routines fresh and fun.',
      'Voce pode trocar o personagem conforme o momento do dia, como manha, tarefa ou hora de dormir, para manter a rotina leve e divertida.',
    ],
    ['Light Mode', 'Modo claro'],
    ['Dark Mode Screen', 'Tela no modo escuro'],
    ['Dark Mode', 'Modo escuro'],
    ['Use Cases', 'Quando usar'],
    ['"Hurry Up!"<br>Replacement', 'Um aliado para substituir<br>o "anda logo!"'],
    [
      'Let the timer and characters take over the morning rush—no more repeating “Hurry up!”',
      'Deixe o timer e os personagens assumirem a correria da manha, sem precisar repetir "anda logo!" o tempo todo.',
    ],
    ['Concentration Switch ON', 'Modo foco ativado'],
    [
      '“5 minutes left!”—hearing it from a character boosts focus and motivation.',
      '"Faltam 5 minutos!" dito por um personagem ajuda a aumentar a concentracao e a motivacao.',
    ],
    ['Smooth Transitions', 'Transicoes mais suaves'],
    [
      'Struggling with transitions is normal. TimeSense guides kids gently through changes—like cleaning up or moving from play to study.',
      'Ter dificuldade para mudar de atividade e normal. TimeSense ajuda com carinho na passagem da brincadeira para guardar as coisas ou estudar.',
    ],
    ['Voice Samples', 'Amostras de voz'],
    [
      'Choose voice samples that match your child’s mood and needs.<br>\n                From basic countdowns to playful encouragement—each voice is designed to help kids take action smoothly.',
      'Escolha as vozes que mais combinam com o momento e com a personalidade da crianca.<br>\n                De contagens simples a mensagens de incentivo, cada voz foi pensada para ajudar a agir com mais naturalidade.',
    ],
    ['🎵 Free Character Voices', '🎵 Vozes gratuitas'],
    ['These basic voices are available as soon as you download the app.', 'Essas vozes basicas ficam disponiveis assim que voce baixa o app.'],
    ['"You\'ve got 30 minutes left."', '"Faltam 30 minutos."'],
    ['Daily partner / natural and friendly', 'Companheira do dia a dia, natural e acolhedora'],
    ['Your browser does not support audio playback', 'Seu navegador nao suporta reproducao de audio'],
    ['"Five minutes! We gotta hurry!"', '"Faltam cinco minutos! Vamos nos apressar!"'],
    ['A perfect fit for rushed mornings', 'Perfeita para manhas corridas'],
    ['👑 TimeSense+ Premium Voices', '👑 Vozes premium do TimeSense+'],
    ['With a premium plan, you’ll unlock extra voices tailored for mornings, bedtime, and homework.', 'Com o TimeSense+, voce libera vozes extras pensadas para a manha, a hora de dormir e os momentos de estudo.'],
    ['"Just 5 more! You got this—<br>let’s blast through to the end!"', '"So mais cinco! Voce consegue.<br>Vamos ate o fim!"'],
    ['Hot-blooded big brother in homework mode', 'Jeito de irmao mais velho incentivando nas tarefas'],
    ['"Okay... just one more minute.<br>It’s almost bedtime."', '"Ta bem... falta so um minuto.<br>Ja esta quase na hora de dormir."'],
    ['Gentle voice support from a caring friend', 'Uma voz doce que acompanha com calma'],
    ['Download the App', 'Baixe o app'],
    ['Try it for free today!<br>Upgrade to TimeSense+ for full voice selection and an ad-free experience—designed to fit every moment of your child’s day.', 'Experimente gratis hoje mesmo.<br>Com TimeSense+, voce libera todas as vozes e uma experiencia sem anuncios para acompanhar cada momento do dia.'],
    ['From the Developer', 'Uma palavra da equipe'],
    ['This app was created from our wish to begin each morning with a smile—even during hectic routines and moments when our son found it hard to switch tasks.', 'Este app nasceu do desejo de comecar cada manha com mais leveza, mesmo nos dias corridos e nos momentos em que nosso filho tinha dificuldade para mudar de atividade.'],
    ['With a clear display of remaining time and adorable character voices offering gentle prompts, TimeSense acts like a co-parent—speaking on your behalf.</strong></p>', 'Com o tempo restante mostrado de forma clara e personagens fofos dando avisos gentis, o TimeSense funciona como um parceiro da rotina, falando por voce quando necessario.</strong></p>'],
    ['It’s a timer app built on the ideas of education and kindness, helping kids gradually develop self-direction and time awareness.', 'E um app de timer construido com cuidado e intencao educativa, ajudando as criancas a desenvolver autonomia e nocao de tempo aos poucos.'],
    ['We hope TimeSense can support children and parents all over the world. We’d love to hear your feedback!', 'Esperamos que o TimeSense possa apoiar familias do mundo todo. Vamos adorar ouvir seu feedback!'],
    ['TimeSense Developer', 'Equipe TimeSense'],
    ['Terms of Use', 'Termos de Uso'],
    ['Privacy Policy', 'Politica de Privacidade'],
    ['Development & Operation', 'Desenvolvimento e operacao'],
    ['Contact Us', 'Fale conosco'],
  ],
  termsReplacements: [
    ['TimeSense - Terms of Use', 'TimeSense - Termos de Uso'],
    ['<h1>TimeSense Terms of Use</h1>', '<h1>Termos de Uso do TimeSense</h1>'],
    ['Effective Date: April 1, 2025', 'Data de vigencia: 1 de abril de 2025'],
    ['Last Updated: May 7, 2026', 'Ultima atualizacao: 7 de maio de 2026'],
    ['These Terms of Use ("Terms") set forth the conditions for using the TimeSense app ("App") provided by SynCraft ("we," "us," or "our").', 'Estes Termos de Uso ("Termos") estabelecem as condicoes para o uso do aplicativo TimeSense ("App"), fornecido pela SynCraft ("nos", "nosso" ou "nossa").'],
    ['Please read these Terms carefully before using the App, and use the App only if you agree to them.', 'Leia estes Termos com atencao antes de usar o App e utilize-o apenas se concordar com eles.'],
    ['Article 1: Purpose of the App and Intended Users', 'Artigo 1: Finalidade do App e publico previsto'],
    ['The App is an educational support app designed to help children develop a sense of time.', 'O App e um aplicativo de apoio educativo criado para ajudar criancas a desenvolver a nocao de tempo.'],
    ['The App is intended to be used under parental supervision and is not designed for independent use by children under 13 years of age.', 'O App deve ser utilizado com supervisao de um responsavel e nao foi projetado para uso independente por criancas menores de 13 anos.'],
    ['Some features and content of the App may vary depending on the operating system, device, platform, or related specifications.', 'Alguns recursos e conteudos do App podem variar de acordo com o sistema operacional, o dispositivo, a plataforma ou especificacoes relacionadas.'],
    ['Article 2: Conditions of Use and Prohibited Acts', 'Artigo 2: Condicoes de uso e condutas proibidas'],
    ['Users must not engage in any of the following acts:', 'Os usuarios nao devem praticar nenhuma das seguintes acoes:'],
    ['Modifying, decompiling, reverse engineering, or otherwise altering the App', 'Modificar, descompilar, fazer engenharia reversa ou alterar o App de qualquer outra forma'],
    ['Reproducing, redistributing, or selling the App or any part of it without permission', 'Reproduzir, redistribuir ou vender o App ou qualquer parte dele sem autorizacao'],
    ['Acts that violate laws, regulations, or public order and morals', 'Acoes que violem leis, regulamentos, a ordem publica ou os bons costumes'],
    ['Acts that interfere with the operation of the App', 'Acoes que interfiram no funcionamento do App'],
    ['Any other acts that we deem inappropriate', 'Quaisquer outras acoes que considerarmos inadequadas'],
    ['Article 3: Intellectual Property Rights', 'Artigo 3: Direitos de propriedade intelectual'],
    ['All copyrights and other intellectual property rights relating to the characters, illustrations, audio, programs, designs, text, and other content included in the App belong to us or to third parties with legitimate rights.', 'Todos os direitos autorais e demais direitos de propriedade intelectual relacionados aos personagens, ilustracoes, audios, programas, designs, textos e outros conteudos incluidos no App pertencem a nos ou a terceiros que detenham legitimamente tais direitos.'],
    ['Unauthorized use, reproduction, republication, redistribution, or similar acts are prohibited.', 'Sao proibidos o uso, a reproducao, a republicacao, a redistribuicao e atos semelhantes sem autorizacao.'],
    ['Article 4: Charges and Purchases', 'Artigo 4: Cobrancas e compras'],
    ['The App is available for basic use free of charge, while some features are offered as paid plans.', 'O App pode ser usado gratuitamente em suas funcoes basicas, enquanto alguns recursos sao oferecidos em planos pagos.'],
    ['Paid plans may include the following:', 'Os planos pagos podem incluir o seguinte:'],
    ['Monthly subscriptions', 'Assinaturas mensais'],
    ['Annual subscriptions', 'Assinaturas anuais'],
    ['One-time purchase plans', 'Planos de compra unica'],
    ['Subscriptions are billed through Google Play or the App Store and renew automatically.', 'As assinaturas sao cobradas pelo Google Play ou pela App Store e sao renovadas automaticamente.'],
    ['Users may turn off auto-renewal at any time from their account settings in the relevant store.', 'Os usuarios podem desativar a renovacao automatica a qualquer momento nas configuracoes da conta da loja correspondente.'],
    ['Even after cancellation, premium features remain available until the end of the current subscription period.', 'Mesmo apos o cancelamento, os recursos premium permanecem disponiveis ate o fim do periodo de assinatura em andamento.'],
    ['Billing, cancellations, refunds, and related procedures are handled in accordance with the policies of Google Play or the App Store.', 'Cobranca, cancelamentos, reembolsos e procedimentos relacionados sao tratados de acordo com as politicas do Google Play ou da App Store.'],
    ['Purchase information and premium features are tied to the account of the platform where the purchase was made, either Google Play or the App Store.', 'As informacoes de compra e os recursos premium ficam vinculados a conta da plataforma em que a compra foi feita, seja Google Play ou App Store.'],
    ['Purchase status is not shared between the iOS and Android versions.', 'O status da compra nao e compartilhado entre as versoes de iOS e Android.'],
    ['Article 5: Advertising', 'Artigo 5: Publicidade'],
    ['Banner advertisements may be displayed in the Android version.', 'Anuncios em banner podem ser exibidos na versao Android.'],
    ['The content and display methods of advertisements may change without prior notice.', 'O conteudo e a forma de exibicao dos anuncios podem mudar sem aviso previo.'],
    ['Advertisements may be hidden while a premium plan is active.', 'Os anuncios podem ficar ocultos enquanto um plano premium estiver ativo.'],
    ['Article 6: Disclaimer', 'Artigo 6: Isencao de responsabilidade'],
    ['We do not guarantee that the App will always function properly on all devices and operating system environments, nor do we guarantee its accuracy, safety, or fitness for any particular purpose.', 'Nao garantimos que o App funcionara corretamente em todos os dispositivos e ambientes de sistema operacional, nem garantimos sua precisao, seguranca ou adequacao a qualquer finalidade especifica.'],
    ['Some features may become unavailable or stop working properly due to changes in operating systems or device specifications, communication conditions, or changes to external services and development platforms. In particular, after updates, some or all of the App may no longer be available on older devices or operating systems that are no longer supported.', 'Alguns recursos podem deixar de estar disponiveis ou parar de funcionar corretamente devido a mudancas no sistema operacional, nas especificacoes do dispositivo, nas condicoes de comunicacao ou em servicos externos e plataformas de desenvolvimento. Em especial, apos atualizacoes, parte ou todo o App pode deixar de estar disponivel em dispositivos antigos ou sistemas operacionais que nao recebem mais suporte.'],
    ['Data in the App may be stored on your device and may be lost due to app deletion, device changes, malfunctions, operating system updates, or other circumstances.', 'Os dados do App podem ficar armazenados no seu dispositivo e podem ser perdidos devido a exclusao do aplicativo, troca de aparelho, falhas, atualizacoes do sistema operacional ou outras circunstancias.'],
    ['Notifications, timers, alarms, and similar features may also not work as expected depending on device settings or operating system specifications.', 'Notificacoes, timers, alarmes e recursos semelhantes tambem podem nao funcionar como esperado, dependendo das configuracoes do dispositivo ou das especificacoes do sistema operacional.'],
    ['We will make reasonable efforts to provide the App in a stable manner, but we cannot guarantee every outcome related to defects, data loss, functional limitations, or other effects arising from the use of or inability to use the App.', 'Faremos esforcos razoaveis para oferecer o App de forma estavel, mas nao podemos garantir todos os resultados relacionados a falhas, perda de dados, limitacoes funcionais ou outros efeitos decorrentes do uso ou da impossibilidade de uso do App.'],
    ['Article 7: Changes to or Termination of the Service', 'Artigo 7: Alteracoes ou encerramento do servico'],
    ['To improve the App, we may add, change, or review its features and content as needed. As a result, some features may be discontinued or may work differently from before.', 'Para melhorar o App, podemos adicionar, alterar ou revisar seus recursos e conteudos quando necessario. Como resultado, alguns recursos podem ser descontinuados ou passar a funcionar de modo diferente do anterior.'],
    ['We may also reduce, suspend, or terminate all or part of the App based on development or operational circumstances, supported device conditions, or technical maintenance considerations.', 'Tambem podemos reduzir, suspender ou encerrar todo ou parte do App conforme circunstancias de desenvolvimento ou operacao, condicoes dos dispositivos suportados ou necessidades tecnicas de manutencao.'],
    ['We will make reasonable efforts to improve and continue operating the App in a way that is easy for users to use. For important changes or the end of service, we will provide notice within the App or on our website whenever reasonably possible.', 'Faremos esforcos razoaveis para melhorar e manter o App em funcionamento de uma forma facil de usar. Em caso de mudancas importantes ou encerramento do servico, faremos comunicados dentro do App ou em nosso site sempre que for razoavelmente possivel.'],
    ['Article 8: Changes to These Terms', 'Artigo 8: Alteracoes destes Termos'],
    ['We may revise these Terms as necessary.', 'Podemos revisar estes Termos sempre que necessario.'],
    ['Any revised Terms take effect when posted in the App or on our website.', 'Quaisquer Termos revisados entram em vigor quando forem publicados no App ou em nosso site.'],
    ['Article 9: Voice Synthesis and Credits', 'Artigo 9: Sintese de voz e creditos'],
    ['Some Japanese-language audio used in the App is created using voice synthesis technology.', 'Parte dos audios em japones usados no App foi criada com tecnologia de sintese de voz.'],
    ['Based on the VOICEVOX terms of use, the following voice libraries are used for Japanese character voices in the App:', 'Com base nos termos de uso do VOICEVOX, as seguintes bibliotecas de voz sao usadas para as vozes dos personagens em japones no App:'],
    ['The copyrights and licenses for each voice belong to their respective providers.', 'Os direitos autorais e as licencas de cada voz pertencem aos respectivos fornecedores.'],
    ['Unauthorized reproduction, redistribution, or modification of the audio used in the App is prohibited.', 'E proibida a reproducao, redistribuicao ou modificacao nao autorizada dos audios usados no App.'],
    ['Article 10: Contact', 'Artigo 10: Contato'],
    ['Developer and Operator:', 'Desenvolvimento e operacao:'],
    ['Contact:', 'Contato:'],
    ['Return to App Overview', 'Voltar para a pagina do app'],
  ],
  privacyReplacements: [
    ['TimeSense - Privacy Policy', 'TimeSense - Politica de Privacidade'],
    ['<h1>TimeSense Privacy Policy</h1>', '<h1>Politica de Privacidade do TimeSense</h1>'],
    ['Effective Date: April 1, 2025', 'Data de vigencia: 1 de abril de 2025'],
    ['Last Updated: May 7, 2026', 'Ultima atualizacao: 7 de maio de 2026'],
    ['TimeSense ("the App") respects user privacy and handles personal information in accordance with the policy below.', 'O TimeSense ("App") respeita a privacidade dos usuarios e trata informacoes pessoais de acordo com a politica abaixo.'],
    ['This page includes information for both the iOS and Android versions.', 'Esta pagina inclui informacoes para as versoes de iOS e Android.'],
    ['Please review the section relevant to the platform you are using.', 'Consulte a secao correspondente a plataforma que voce utiliza.'],
    ['Some features of the App and the external services it uses may vary depending on the platform or operating system.', 'Alguns recursos do App e os servicos externos que ele utiliza podem variar de acordo com a plataforma ou o sistema operacional.'],
    ['1. Information We Collect', '1. Informacoes que coletamos'],
    ['The App does not collect personally identifiable information such as names, addresses, phone numbers, or email addresses.', 'O App nao coleta informacoes pessoais que identifiquem diretamente uma pessoa, como nome, endereco, numero de telefone ou endereco de e-mail.'],
    ['However, the following information may be stored locally on the user\'s device:', 'No entanto, as seguintes informacoes podem ser armazenadas localmente no dispositivo do usuario:'],
    ['App settings, such as timer settings and selected voices', 'Configuracoes do App, como ajustes do timer e vozes selecionadas'],
    ['Routine settings', 'Configuracoes de rotina'],
    ['Usage records, including stamp card history', 'Registros de uso, incluindo o historico do cartao de selos'],
    ['Premium usage status', 'Status de uso premium'],
    ['This information is primarily stored on the user\'s device.', 'Essas informacoes ficam armazenadas principalmente no dispositivo do usuario.'],
    ['In the Android version, anonymized statistical data may be sent to external services for usage analysis and app improvement.', 'Na versao Android, dados estatisticos anonimizados podem ser enviados a servicos externos para analise de uso e melhoria do App.'],
    ['2. Use of Third-Party Services', '2. Uso de servicos de terceiros'],
    ['■ iOS Version', '■ Versao iOS'],
    ['The iOS version does not use the following external services:', 'A versao iOS nao utiliza os seguintes servicos externos:'],
    ['Google AdMob (advertising)', 'Google AdMob (publicidade)'],
    ['Firebase Analytics (usage analytics)', 'Firebase Analytics (analise de uso)'],
    ['In the iOS version, the app operates primarily on the device and does not send personal information or usage data externally.', 'Na versao iOS, o App funciona principalmente no proprio dispositivo e nao envia informacoes pessoais nem dados de uso para fora dele.'],
    ['■ Android Version', '■ Versao Android'],
    ['The Android version may use the following third-party services for providing and improving the App:', 'A versao Android pode usar os seguintes servicos de terceiros para oferecer e melhorar o App:'],
    ['● Google AdMob (Advertising)', '● Google AdMob (Publicidade)'],
    ['The Android version may display banner advertisements using Google AdMob.', 'A versao Android pode exibir anuncios em banner usando o Google AdMob.'],
    ['The App is submitted to Google Play as a "Designed for Families" app, and advertisements are delivered in compliance with Google\'s Families policies.', 'O App e publicado no Google Play como um app "Designed for Families", e os anuncios sao veiculados de acordo com as politicas da categoria Families do Google.'],
    ['We make reasonable efforts to avoid inappropriate advertisements being shown.', 'Fazemos esforcos razoaveis para evitar a exibicao de anuncios inadequados.'],
    ['● Firebase Analytics (Usage Analytics)', '● Firebase Analytics (Analise de uso)'],
    ['The Android version may use Firebase Analytics to improve the App and understand usage trends.', 'A versao Android pode usar o Firebase Analytics para melhorar o App e entender tendencias de uso.'],
    ['Information collected by Firebase Analytics is anonymized statistical data and does not directly identify individuals.', 'As informacoes coletadas pelo Firebase Analytics sao dados estatisticos anonimizados e nao identificam diretamente individuos.'],
    ['Analytics data is sent only when the user has consented, such as on first launch.', 'Os dados analiticos sao enviados apenas quando o usuario deu consentimento, como no primeiro inicio do App.'],
    ['This setting can be changed at any time from within the App\'s settings.', 'Essa configuracao pode ser alterada a qualquer momento nas configuracoes do App.'],
    ['3. In-App Purchases', '3. Compras no aplicativo'],
    ['The App offers in-app purchases through Google Play or the App Store.', 'O App oferece compras no aplicativo por meio do Google Play ou da App Store.'],
    ['Payment processing is handled securely by each store, and the App does not store or collect payment information such as credit card details.', 'O processamento do pagamento e realizado com seguranca por cada loja, e o App nao armazena nem coleta informacoes de pagamento, como dados de cartao de credito.'],
    ['Purchase information and premium features are tied to the account on the platform where the purchase was made, either Google Play or the App Store.', 'As informacoes de compra e os recursos premium ficam vinculados a conta da plataforma onde a compra foi realizada, seja Google Play ou App Store.'],
    ['Purchase status is not shared between the iOS and Android versions.', 'O status da compra nao e compartilhado entre as versoes de iOS e Android.'],
    ['4. Privacy Policies of External Services', '4. Politicas de privacidade de servicos externos'],
    ['Please refer to the following for more information about each service:', 'Consulte os links abaixo para obter mais informacoes sobre cada servico:'],
    ['Google Privacy Policy', 'Politica de Privacidade do Google'],
    ['Apple Privacy Policy', 'Politica de Privacidade da Apple'],
    ['5. Changes to This Privacy Policy', '5. Alteracoes nesta Politica de Privacidade'],
    ['This policy may be changed as needed.', 'Esta politica pode ser alterada quando necessario.'],
    ['Any changes become effective when posted in the App or on our website.', 'Quaisquer alteracoes passam a valer quando forem publicadas no App ou em nosso site.'],
    ['6. Contact', '6. Contato'],
    ['Developer and Operator:', 'Desenvolvimento e operacao:'],
    ['Contact:', 'Contato:'],
    ['Return to App Overview', 'Voltar para a pagina do app'],
  ],
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
  if (lang === 'ja') return `https://syncraft.dev/timesense/${suffix}`;
  return `https://syncraft.dev/timesense/${lang}/${suffix}`;
}

function hreflangFor(lang) {
  if (lang === 'zh-hant') return 'zh-Hant';
  if (lang === 'zh-hans') return 'zh-Hans';
  if (lang === 'pt-br') return 'pt-BR';
  return lang;
}

function alternateBlock(kind) {
  const lines = localeOrder.map(
    (lang) => `    <link rel="alternate" hreflang="${hreflangFor(lang)}" href="${localeUrl(lang, kind)}">`,
  );
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

let indexContent = baseIndex;
indexContent = mustReplace(indexContent, '<html lang="en">', `<html lang="${ptBrConfig.htmlLang}">`, 'pt-br/index');
indexContent = mustReplace(indexContent, 'https://syncraft.dev/timesense/en/', `https://syncraft.dev/timesense/${ptBrConfig.dir}/`, 'pt-br/index');
indexContent = mustReplace(indexContent, '<meta name="description" content="TimeSense is a smart voice timer app that helps children manage time in a fun way. Characters gently remind them of what’s next.">', `<meta name="description" content="${ptBrConfig.metaDescription}">`, 'pt-br/index');
indexContent = mustReplace(indexContent, '<meta property="og:title" content="TimeSense - Voice Timer for Kids">', `<meta property="og:title" content="${ptBrConfig.ogTitle}">`, 'pt-br/index');
indexContent = mustReplace(indexContent, '<meta property="og:description" content="No more rushing! Cute characters gently guide your child through routines like getting ready, studying, and going out.">', `<meta property="og:description" content="${ptBrConfig.ogDescription}">`, 'pt-br/index');
indexContent = mustReplace(indexContent, '<title>TimeSense - Voice Timer for Kids</title>', `<title>${ptBrConfig.title}</title>`, 'pt-br/index');
indexContent = updateSharedNav(indexContent, 'index', 'pt-br', 'pt-br/index');
indexContent = mustReplace(indexContent, 'Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg', 'Download_on_the_App_Store_Badge_PTBR_RGB_blk_092917.svg', 'pt-br/index');
indexContent = mustReplace(indexContent, 'luma_30minleft_en.png', 'luma_30minleft_pt-br.png', 'pt-br/index');
indexContent = mustReplace(indexContent, 'src="luma_30min.mp3"', 'src="luma_pt_30min.mp3"', 'pt-br/index');
indexContent = mustReplace(indexContent, 'src="pico_nor_5min.mp3"', 'src="pico_nor_pt_5min.mp3"', 'pt-br/index');
indexContent = mustReplace(indexContent, 'src="milo_5min.mp3"', 'src="milo_pt_5min.mp3"', 'pt-br/index');
indexContent = mustReplace(indexContent, 'src="toto_1min.mp3"', 'src="toto_pt_1min.mp3"', 'pt-br/index');
indexContent = replaceAll(indexContent, ptBrConfig.replacements, 'pt-br/index');
writeFile('pt-br/index.html', indexContent);

let termsContent = baseTerms;
termsContent = mustReplace(termsContent, '<html lang="en">', `<html lang="${ptBrConfig.htmlLang}">`, 'pt-br/terms');
termsContent = mustReplace(termsContent, 'https://syncraft.dev/timesense/en/terms/', `https://syncraft.dev/timesense/${ptBrConfig.dir}/terms/`, 'pt-br/terms');
termsContent = updateSharedNav(termsContent, 'terms', 'pt-br', 'pt-br/terms');
termsContent = replaceAll(termsContent, ptBrConfig.termsReplacements, 'pt-br/terms');
termsContent = mustReplace(termsContent, 'https://syncraft.dev/timesense/en/" class="button"', `https://syncraft.dev/timesense/${ptBrConfig.dir}/" class="button"`, 'pt-br/terms');
writeFile('pt-br/terms/index.html', termsContent);

let privacyContent = basePrivacy;
privacyContent = mustReplace(privacyContent, '<html lang="en">', `<html lang="${ptBrConfig.htmlLang}">`, 'pt-br/privacy');
privacyContent = mustReplace(privacyContent, 'https://syncraft.dev/timesense/en/privacy/', `https://syncraft.dev/timesense/${ptBrConfig.dir}/privacy/`, 'pt-br/privacy');
privacyContent = updateSharedNav(privacyContent, 'privacy', 'pt-br', 'pt-br/privacy');
privacyContent = replaceAll(privacyContent, ptBrConfig.privacyReplacements, 'pt-br/privacy');
privacyContent = mustReplace(privacyContent, 'https://syncraft.dev/timesense/en/" class="button"', `https://syncraft.dev/timesense/${ptBrConfig.dir}/" class="button"`, 'pt-br/privacy');
writeFile('pt-br/privacy/index.html', privacyContent);

const existingIndexPages = [
  ['index.html', 'ja'],
  ['en/index.html', 'en'],
  ['es/index.html', 'es'],
  ['de/index.html', 'de'],
  ['fr/index.html', 'fr'],
  ['ko/index.html', 'ko'],
  ['zh-hant/index.html', 'zh-hant'],
  ['zh-hans/index.html', 'zh-hans'],
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
  ['zh-hant/terms/index.html', 'zh-hant', 'terms'],
  ['zh-hant/privacy/index.html', 'zh-hant', 'privacy'],
  ['zh-hans/terms/index.html', 'zh-hans', 'terms'],
  ['zh-hans/privacy/index.html', 'zh-hans', 'privacy'],
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

console.log('Generated TimeSense pt-BR pages and updated language navigation.');
