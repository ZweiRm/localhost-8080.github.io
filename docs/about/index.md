---
editLink: false
sidebar: false
comment: false
---

# About Me
<script setup>
import { VPTeamMembers } from 'vitepress/theme'
import { onMounted } from 'vue'

const members = [
  {
    avatar: '/img/me.jpg',
    name: 'Duo Huang',
    title: 'Software Engineer',
    org: 'Xiaomi Inc.',
    orgLink: 'https://mi.com',
    links: [
        { icon: 'github', link: 'https://github.com/ZweiRm/' },
        {
            icon: {
                svg: '<svg t="1742816019966" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2790" width="200" height="200"><path d="M1006.08 348.16c-7.68-10.24-15.36-17.92-28.16-25.6l-71.68-46.08V84.48c0-46.08-38.4-84.48-84.48-84.48h-614.4C161.28 0 122.88 38.4 122.88 84.48v184.32L38.4 322.56c-2.56 2.56-7.68 5.12-10.24 7.68C10.24 348.16 0 368.64 0 394.24v545.28c0 46.08 38.4 84.48 84.48 84.48h855.04c46.08 0 84.48-38.4 84.48-84.48V394.24c0-15.36-7.68-30.72-17.92-46.08m-99.84 2.56l20.48 12.8-20.48 12.8v-25.6z m-721.92-266.24c0-10.24 10.24-20.48 20.48-20.48h616.96c10.24 0 20.48 10.24 20.48 20.48V419.84l-332.8 215.04L184.32 424.96V84.48zM122.88 343.04v40.96l-33.28-20.48 33.28-20.48z" p-id="2791"></path><path d="M314.88 232.96h399.36c17.92 0 30.72-12.8 30.72-30.72s-12.8-30.72-30.72-30.72h-399.36c-17.92 0-30.72 12.8-30.72 30.72s15.36 30.72 30.72 30.72m320 128c0-17.92-12.8-30.72-30.72-30.72H314.88c-17.92 0-30.72 12.8-30.72 30.72s12.8 30.72 30.72 30.72H604.16c17.92 2.56 30.72-12.8 30.72-30.72" p-id="2792"></path></svg>',
            },
            link: '#copy-email'
        }
    ],
  },
]

onMounted(() => {
  const link = document.querySelector('a[href="#copy-email"]')
  if (link) {
    link.addEventListener('click', async (e) => {
      e.preventDefault()
      const email = 'momg AT foxmail DOT com'
      try {
        await navigator.clipboard.writeText(email)
      } catch {
        // fallback for older browsers
        const ta = document.createElement('textarea')
        ta.value = email
        ta.style.position = 'fixed'
        ta.style.opacity = '0'
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        ta.remove()
      }
      const toast = document.createElement('div')
      toast.textContent = '已复制邮箱地址 "' + email + '" 请修改后发送邮件'
      toast.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:var(--vp-c-bg-soft);color:var(--vp-c-text-1);padding:12px 24px;border-radius:8px;box-shadow:0 2px 12px rgba(0,0,0,.15);z-index:9999;font-size:14px;transition:opacity .3s;'
      document.body.appendChild(toast)
      setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 300) }, 3000)
    })
  }
})
</script>

<VPTeamMembers size="medium" :members="members" />

Hi, I'm Duo Huang. I work on the Android framework and SystemUI at Xiaomi Inc. as a Software R&D Engineer, and I lead SubScreenCenter, the rear-display launcher on Xiaomi's dual-screen phone. For the 17 Pro generation, Xiaomi reports 3.97 million daily active users of the rear display.

I have an MSc in Advanced Information Systems from Hong Kong Baptist University, where I received a Merit Scholarship, and a BEng in Software Engineering from Shanxi Agricultural University, where I ranked in the top 5% of my program.

My research interest is how the operating system should decide what appears on each screen a person uses and how an app's interface should adapt to that screen. I want to measure how these decisions affect what the user sees and does, and what people nearby can see on a screen such as the rear display of a dual-screen phone. I am equally interested in letting an LLM agent act for the user without going beyond what the user allowed, and in deciding which of its actions need the user's confirmation. I work on both at Xiaomi. I am also interested in using LLM agents to help engineers trace a defect in a phone's system software from its bug report and logs to the component it comes from.

I started CausalAdapt under Xiaomi's Open-Competition Research Program ("Jiebang Guashuai") and lead it with a team at South China University of Technology (SCUT). I am named on 23 inventions in systems, HCI and ML.

## Education

+ **Hong Kong Baptist University (HKBU)**, Hong Kong, MSc in Advanced Information Systems, 09/2020 - 11/2021. The program has since been renamed MSc in Data Analytics and Artificial Intelligence.
+ **Shanxi Agricultural University (SXAU)**, Shanxi, BEng in Software Engineering, 09/2014 - 07/2018

## Research Project

### CausalAdapt, Xiaomi Open-Competition Research Program ("Jiebang Guashuai")
2026 - 2027 | Project Lead | Competitive research grant: 200,000+ CNY

I originated CausalAdapt. App developers maintain only portrait phone layouts while new form factors (tablets, foldables, flip phones, and others) keep appearing, so hand-written adaptation rules cannot cover them. The project treats choosing an adaptation strategy as a causal question linking device, strategy and user experience. I am responsible for the problem framing, the production datasets, and the deployment evaluation, while collaborators at South China University of Technology (SCUT) implement the algorithm.

The project also raises an HCI question about the quality gap users perceive between manual developer adaptation and automated adaptation, and about what makes an automatic UI change acceptable to them.

## Publication

+ D. Huang, "The Development and Future Challenges of the Multi-armed Bandit Algorithm," *2024 International Conference on Image Processing, Computer Vision and Machine Learning (ICICML)*, Shenzhen, China, 2024, pp. 1922-1930 (single-author survey). [DOI: 10.1109/ICICML63543.2024.10957859](https://doi.org/10.1109/ICICML63543.2024.10957859)
+ Manuscript in preparation: *CausalAdapt: causal inference and machine learning for automated UI adaptation across form factors*, with the SCUT team. We plan co-first authorship and a submission in 2027.

### Software Registration
+ D. Huang, et al., "Design and Implementation of Health Management Platform for Special Groups", Registration No. 2018SR796507
+ D. Huang, "Design and Implementation of Online Examination Platform on Java", Registration No. 2018SR611370

## Patents

Of my 23 inventions, 19 are filed with CNIPA, one of them also at the EPO and the USPTO, and 4 are in Xiaomi's internal patent review, one of which has been approved. I am first inventor on 13, second inventor on 3 and a later co-inventor on 7.

### Rear Display+ 2.0

+ **Rear-display AI companion**, CNIPA application No. 2026114508869
+ **Message Notification Method, Apparatus, Device, Medium and Program Product**, on LLM-driven cross-device notification routing with wearable human-factor signals, CNIPA application No. 2026114959168, filed September 2026
+ **Application Running Method, Apparatus, Electronic Device, Product, Chip and Storage Medium**, on running app cards that AI generates from a user's prompt on the rear display, CNIPA application No. 2026114346154, filed September 2026

### Machine Learning with Systems

+ **User Experience-driven Mobile Resource Optimization System Based on Causal Inference**, under Xiaomi's internal patent review
+ **Cross-device Adaptive Framework for Applications Based on Causal Machine Learning and Multi-task Learning**, under Xiaomi's internal patent review
+ **Machine Learning and Configuration-based Viewing Issues Auto-Detecting-Fixing and Relaunching for Application Screencasting**, invention patent application No. 2025102210572, published by CNIPA as CN122653870A
+ **Security and Privacy Detection and Application Navigation Blocking for Large-Screen Application Casting**, CNIPA application No. 2025105502820
+ **Cross-Device Application Flow Dynamic Adaptation, Visualisation Feedback and Machine-Learning-Based Active Sensing on Virtual Display Terminals**, CNIPA application No. 2025111341262
+ **Mutual Exclusion Management for Interconnected Large-Screen Casting Based on Service Preemption**, CNIPA application No. 2025115546401

### Machine Learning and Human-Computer Interaction

+ **Deep-Learning-based Notification Fatigue Prediction and Privacy-adaptive Distribution for Dual-screen Terminals**, CNIPA application No. 2026105904359
+ **Unified Authentication Engine with Multimodal Biometric Fusion and Continuous Confidence Scoring**, under Xiaomi's internal patent review
+ **AI-Assistant-powered Cross-screen Sticky-note Information Residence for Dual-screen Terminals**, CNIPA application No. 2025113509677
+ **Context-aware Notification Privacy Management for Dual-screen Terminals**, CNIPA application No. 2025113506310
+ **Device-Posture-aware Ringing Notification and Management for the Secondary Screen of Dual-screen Terminals**, CNIPA application No. 2025113675821
+ **Multi-layer Spatial Management and Intelligent Display for Secondary-screen Notifications on Dual-screen Mobile Terminals**, CNIPA application No. 2025113520869
+ **Safe Interaction and Persistence Management for Car Control on the Secondary Screen of Dual-screen Terminals**, CNIPA application No. 2025113509520, also filed at the EPO (EP262060296) and the USPTO (19/812305)
+ **Application Permission Management Control Framework for Dual-screen Devices**, CNIPA application No. 2025113861990
+ **Displaying Information on a Backlit Screen When the Screen is Off**, CNIPA application No. 2025113506414
+ **A Low-Memory Solution for Loading Circular Lists**, CNIPA application No. 2025113506240
+ **A Dual-Screen Electronic Pet Interaction Solution**, CNIPA application No. 2025113520229
+ **Dual-Screen Dual-Desktop Interactive Animation**, CNIPA application No. 2025113500846

## Open Source Contributions

### Android Open Source Project (AOSP), Google

Three changelists (CLs) I wrote, and two from a fix I worked on with colleagues, are merged in the AOSP main branch, which ships on more than 1.5 billion devices.

+ Changed the CTS display point calculation so the x coordinate accounts for a widget cutout, as the y coordinate already did for the camera cutout
  [CL 3026725](https://android-review.googlesource.com/c/platform/cts/+/3026725)
+ Replaced an exact equality check with tolerance-based validation where the compared value came out of a rounding step
  [CL 3309476](https://android-review.googlesource.com/c/platform/cts/+/3309476)
+ Removed a second subtraction of the display cutout in testMinimalSizeDocked. The parent frame already excludes the cutout, and the old code assumed it was on the left side of the screen
  [CL 3505814](https://android-review.googlesource.com/c/platform/cts/+/3505814)
+ Worked with two colleagues on a SystemUI bug that miscalculated the side cutout when the screen rotated from portrait to landscape. We investigated it and designed the fix together, and they submitted it
  [CL 3554263](https://android-review.googlesource.com/c/platform/frameworks/base/+/3554263), [CL 3559567](https://android-review.googlesource.com/c/platform/frameworks/base/+/3559567)

### VuePress, Vue

+ Localized the project documentation and fixed errors found in it
  [PR 2934](https://github.com/vuejs/vuepress/pull/2934)

## Industry Experience

**Xiaomi Group**, Software R&D Engineer (Android Framework and SystemUI), 06/2022 - Present

### LLM Agent to OS Integration (Super XiaoAI Expert Mode)

+ Built the rear-display integration, now shipping, for the LLM agent of Super XiaoAI Expert Mode (miclaw), which uses Android's AppFunctions API
+ Wrote `manage_pin`, the tool the agent calls to pin notes on the rear display. The code merged in the miclaw main branch includes a regression check that passes only when a live tool call happened

### Rear Display+ (Xiaomi 17 Pro Series)

+ Lead SubScreenCenter, the rear-display launcher, and built its system-side usage instrumentation
+ Built the SmartAssistant service panel and its 15 card types, including their TalkBack adaptation. One card shows notifications that any app posts through Android's Live Updates API. Notifications on the rear display adapt to the phone's posture. Xiaomi reports 138 million SmartAssistant uses in a single month on the 17 Pro generation
+ Built a SmartAssistant card that shows a Xiaomi electric car's charge and range and unlocks the car without unlocking the phone. I am first inventor on its patent application
+ Built the sticky-note (Pin) system, which pins any text or image circled on the main screen with the XiaoAI assistant to the rear display, and its agent tool. A pinned ticket QR code opens with one double-tap instead of six steps
+ Designed the dual-screen permission and authentication model, which decides what content is shown on which screen and under what biometric verification, for a second screen that faces outward and is visible to people near the user
+ Designed the rear display for quick tasks, between a full launcher and a clock-only screen, and defined its interaction design, which had no earlier conventions to follow, including how calls, alarms and other live content appear in Xiaomi HyperIsland at the top of the main screen, on the rear display or on both
+ Co-designed and implemented the rear-display watch face system, which sets the clock style and wallpaper and can show a user's own photos as moving wallpapers generated by AI

### Rear Display+ 2.0 (Xiaomi 18 Pro Series, launched September 2026)

+ Prototyped AI app cards, where a user's prompt generates a runnable app that is validated automatically before it runs. I took part in the design and I am a co-inventor on its patent application (CNIPA 2026114346154)
+ Co-designed the rear-display launcher panel, which hosts light apps generated by AI from natural-language prompts. Some come preset, such as an egg timer and a vocabulary card, and users can generate their own. Built its demo and three alternative layout prototypes for the project's design review, and now maintain and extend it in production
+ Designed the rear-display AI companion, an on-screen character that talks with the user and carries out spoken requests, such as switching off a light. Its conversation is provided by Super XiaoAI Expert Mode. I am first inventor on its patent application

### Agent Tooling for the Development Team

+ Built agent tooling for the team, including project-level skills, a Model Context Protocol (MCP) integration layer, read-only reviewer and researcher agents with enforced tool allowlists, and a setup script that lets each teammate reproduce the same setup
+ Wrote a permission policy, stored in the repository, that denies irreversible operations

### Defect Triage Tooling for Production Issues

+ Built a batch triage tool that checks whether an application-not-responding (ANR) ticket originates in the display driver rather than the application, writes its evidence onto the ticket and routes it to the owning team. It has handled 153 tickets, 140 of them in one driver-level root-cause cluster, and routed about 128
+ Designed the write path for tickets owned by other engineers. Writing is off by default and stops after the first write, and each write is confirmed by re-checking the expected state on the ticket instead of relying on the exit code
+ Built a second tool for triaging user feedback in the first month after a product goes on sale, with an LLM judgement step, after which a person confirms each result

### Large-screen Application Casting (EV Infotainment and Cross-device Handoff)

+ Developed Android framework window-management code for casting apps from phones to tablets and car displays, covering window lifecycle, display configuration adaptation, and fault detection and recovery
+ Designed the interaction flow for a user moving from phone to car. It decides which app state transfers, and how the phone shows where the app runs and brings it back in one tap
+ Filed patents applying machine learning to casting fault detection, security and privacy screening, and navigation blocking

### Dynamic Application Adaptation (Rule-Based Transformation Framework)

+ Built the rule-based transformation engine that produces a layout for every third-party app on heterogeneous displays. The top 200 apps by usage are adapted case by case, and every other app falls back to a fixed-orientation centred presentation
+ Ran more than 1,000 systematic experiments to build a taxonomy of adaptation patterns

### Android Compatibility

+ Led the xTS (Android compatibility test suite) compliance effort and resolved more than 150 critical Window Management System issues

### Code Contributions and Mentorship

+ Contributed 221,032 lines of production code to the Android framework window-management layer, xTS compliance and the rear-display feature modules
+ Designed an onboarding curriculum on systems architecture and the Android framework for new graduate engineers (2023-2025). Two recent graduates I mentored were working independently on production framework code within six months

## Technical Skills

+ **Systems**: Android Framework (window and display management, activity and process management, rendering), AOSP, AIDL/Binder IPC, cross-device window and display coordination
+ **AI/ML**: multi-armed bandits (single-author survey), causal-inference framing for UI adaptation, applied LLM agent tool use
+ **Agents and LLM Tool Use**: agent-to-OS tool interfaces (Android AppFunctions API), read-only agents with tool allowlists, MCP integration
+ **Testing and Compatibility**: Android xTS/CTS, framework fault localisation and repair, batch defect triage over production issue tickets, Gerrit code review
+ **Data Analytics**: Tableau, Power BI, Weka
+ **Full-Stack**: Vue, Spring, MySQL, Redis, Git

## Honors & Awards

+ **Sci-Tech Innovation Rising Star Award**, Xiaomi Group, 2026. One of 33 recipients in a company of about 60,000 people
+ **Xiaomi Ten-Million-Yuan Technology Award, Second Prize**, 2025, for Rear Display+ on the Xiaomi 17 Pro series (team award, core framework R&D developer)
+ **Outstanding Patent Project Award**, 2025, for Rear Display+ (team award, 7 patents as first or second inventor and 6 as co-inventor)
+ **Xiaomi Role Model Award**, 2025 Q4 (team award)
+ **Xiaomi Ten-Million-Yuan Technology Award, Finalist Prize**, 2024, for Human x Car x Home Handoff (Large-Screen Casting) (team award, core framework R&D developer)
+ **Software Division Accelerated Leadership Program**, First Cohort, 2024
+ **Xiaomi Emerging Engineers Program Candidate** with RSU promotion, 2024
+ **Xiaomi Star Award**, M-Series Pad Project, 2023
+ Merit Scholarship, HKBU, 2021
+ National Encouragement Scholarship, Ministry of Education of the PRC, 2017
+ Merit Student, SXAU, 2017
+ Second-class Academic Scholarship, SXAU, 2017

## Qualifications

+ Assistant Engineer in System Architecture Design, Chinese Academy of Sciences (CAS)
