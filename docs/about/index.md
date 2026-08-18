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

Hi! I'm Duo Huang, a Software R&D Engineer working on Android platform internals (window and display management, activity and process management, rendering) at Xiaomi Inc., based in Beijing. I lead SubScreenCenter, the rear-display (secondary-screen) launcher shipped on the Xiaomi 17 series, and I contribute to the Android Open Source Project (AOSP), where merged Window Manager and xTS changes reach 1.5+ billion active devices.

I earned my Master of Science in Advanced Information Systems (the program is now named MSc in Data Analysis and Artificial Intelligence) from Hong Kong Baptist University (Merit Scholarship) and hold a BEng in Software Engineering from Shanxi Agricultural University (top 5% in program).

My research interests center on **system software for emerging computing platforms**, and increasingly on **LLM agents and on-device generative UI as OS-level concerns**. As mobile devices evolve from standalone smartphones into hubs that coordinate wearables, extended reality (XR) headsets, vehicle infotainment, and industrial IoT endpoints, the OS and framework layers must manage increasingly heterogeneous hardware, real-time constraints, and cross-device state under tight resource budgets. I am interested in understanding and improving how these system-level mechanisms shape end-to-end user experience across new form factors, and in how agentic AI and generated interfaces can be hosted safely and predictably by the system itself.

I originated and lead CausalAdapt, a project under the Xiaomi Open-Competition Research Program ("Jiebang Guashuai", 200,000+ CNY funding), an industry-academia collaboration with a team at South China University of Technology (SCUT). Across systems, HCI, and ML I have 21 inventions: 18 filed patent applications (13 as first inventor) plus 3 under review by Xiaomi's IPR. I remain committed to bridging rigorous research with impactful engineering.

## Education

+ **Hong Kong Baptist University (HKBU)**, Hong Kong -- MSc in Advanced Information Systems, 09/2020 - 11/2021
  *(Program currently named MSc in Data Analysis and Artificial Intelligence)*
+ **Shanxi Agricultural University (SXAU)**, Shanxi -- BEng in Software Engineering, 09/2014 - 07/2018

## Research Experience

### Multi-Armed Bandit Research for Food Recommendation
Beijing, 12/2023 - 03/2024 | Supervisor: Prof. Osman Yagan, Carnegie Mellon University

Investigated the exploration-exploitation trade-off in food recommendation scenarios with limited user interactions. Developed and validated an Upper Confidence Bound (UCB) algorithm variant, building mathematical models that balance preference learning efficiency against recommendation accuracy. Implemented a WeChat-based experimental framework for real-world data collection, enabling controlled experiments with human subjects to compare the variant against baseline approaches.

*Note: this project was not externally published. The ICICML 2024 paper listed below is a separate, independently authored survey of multi-armed bandit algorithms.*

## Research Project

### CausalAdapt -- Xiaomi Open-Competition Research Program ("Jiebang Guashuai" Research Initiative)
2025 - Present | Project Lead | Competitive research grant: 200,000+ CNY

I originated CausalAdapt, the idea of applying causal inference and machine learning to automated UI adaptation across heterogeneous screen form factors (tablets, foldables, flip phones, and others), replacing manual developer adaptation with zero-code decision-making. I own the problem framing, the production datasets, and the deployment evaluation, while collaborators at South China University of Technology (SCUT) implement the causal-inference algorithm and model architecture.

The project addresses a real deployment challenge: the combinatorial explosion of UI layouts across 4+ screen form factors in production Android apps, which demands systematic adaptation at the OS level. It also raises an HCI question I find genuinely open, namely the user-perceived quality gap between manual developer adaptation and automated ML-driven adaptation, and what makes an automatic UI transformation "acceptable".

## Publication

+ D. Huang, "The Development and Future Challenges of the Multi-armed Bandit Algorithm," *2024 International Conference on Image Processing, Computer Vision and Machine Learning (ICICML)*, Shenzhen, China, 2024, pp. 1922-1930 (single-author survey). [DOI: 10.1109/ICICML63543.2024.10957859](https://doi.org/10.1109/ICICML63543.2024.10957859)
+ Manuscript in preparation: *CausalAdapt: causal inference and machine learning for automated UI adaptation across form factors*, with the SCUT team; planned co-first authorship, target submission 2027.

### Software Registration
+ D. Huang, et al., "Design and Implementation of Health Management Platform for Special Groups", Registration No. 2018SR796507
+ D. Huang, "Design and Implementation of Online Examination Platform on Java", Registration No. 2018SR611370

## Patents

21 inventions in systems, HCI, and ML: 18 filed applications (13 as first inventor, 2 as second inventor; one invention extended to CNIPA, EPO, and USPTO via the Paris Convention) plus 3 under review by Xiaomi's IPR. A further 4 invention disclosures are in drafting, with filing to CNIPA pending.

### Selected Patents -- Machine Learning with Systems

+ **User Experience-driven Mobile Resource Optimization System Based on Causal Inference** -- Applied causal inference to model and optimize mobile resource allocation, moving beyond correlation-based approaches to identify true causal factors affecting user experience. *(Under review by Xiaomi's IPR)*
+ **Cross-device Adaptive Framework Based on Causal Machine Learning and Multi-task Learning** -- Designed a multi-task learning framework for cross-device application adaptation, enabling shared representation learning across heterogeneous device configurations. *(Under review by Xiaomi's IPR)*
+ **ML-based Viewing Issues Auto-Detecting-Fixing and Relaunching for Application Screencasting** -- application No.: 2025102210572, preliminary review approved by CNIPA
+ **Security and Privacy Detection with ML for Large-Screen Application Casting** -- application No.: 2025105502820, preliminary review approved by CNIPA
+ **Cross-Device Application Flow Dynamic Adaptation with ML-Based Intelligent Sensing** -- application No.: 2025111341262, preliminary review approved by CNIPA
+ **Interconnected Large-Screen Casting Mutual Exclusion Management with ML-Based Proactive Perception** -- application No.: 2025115546401, preliminary review approved by CNIPA

### Selected Patents -- Machine Learning and/with Human-Computer Interaction

+ **Deep Learning-based Notification Fatigue Prediction and Privacy-adaptive Distribution for Dual-screen** -- A deep learning model predicting user notification fatigue and adaptively distributing notifications across dual-screen terminals under privacy-aware policies. Application No.: 202610590435, filed with CNIPA
+ **Unified Authentication Engine with Multimodal Biometric Fusion and Continuous Confidence Scoring** *(Under review by Xiaomi's IPR)*
+ **AI Assistant-powered Cross-screen Sticky Notes for Dual-screen Terminals** -- application No.: 2025113509677, preliminary review approved by CNIPA
+ **Intelligent Notification Privacy Management Based on Contextual Awareness** -- application No.: 2025113506310, preliminary review approved by CNIPA
+ **Device Posture-aware Ringing Notification and Intelligent Management for Dual-screen** -- application No.: 2025113675821, preliminary review approved by CNIPA
+ **Multi-layer Spatial Management and Intelligent Display for Dual-screen Notifications** -- application No.: 2025113520869, preliminary review approved by CNIPA
+ **Safe Interaction and Persistence Management for Car Control on Secondary Screen** -- application No.: 2025113509520, preliminary review approved by CNIPA; also filed at EPO and USPTO via the Paris Convention
+ **Application Permission Management Control Framework for Dual-screen Devices** -- application No.: 2025113861990, preliminary review approved by CNIPA
+ **Information Display on Backlit Screen When Screen is Off** -- application No.: 2025113506414, preliminary review approved by CNIPA
+ **Low-Memory Solution for Loading Circular Lists** -- application No.: 2025113506240, preliminary review approved by CNIPA
+ **Dual-Screen Electronic Pet Interaction Solution** -- application No.: 2025113520229, preliminary review approved by CNIPA
+ **Dual-Screen Dual-Desktop Interactive Animation Solution** -- application No.: 2025113500846, preliminary review approved by CNIPA
+ **Window-Based Distortion Animation Method** -- application No.: 202211691403.6, open to public

## Open Source Contributions

### Android Open Source Project (AOSP), Google

Five merged CLs across four framework issues (three as sole or first author), merged into the AOSP main branch and estimated to affect more than 1.5 billion active Android devices.

+ Redesigned display spatial logic to dynamically integrate widget/camera cutouts, eliminating layout misalignments in multi-cutout environments
  [CL 3026725](https://android-review.googlesource.com/c/platform/cts/+/3026725)
+ Designed robust validation logic with dynamic tolerance, eliminating precision loss in mirrored activity calculations and enhancing system stability in Media Projection-related testing
  [CL 3309476](https://android-review.googlesource.com/c/platform/cts/+/3309476)
+ Streamlined cutout calculations in WindowManagerAnimation by removing coupling and establishing unidirectional data flow for consistent cross-cutout configurations
  [CL 3505814](https://android-review.googlesource.com/c/platform/cts/+/3505814)
+ Developed dynamic screen size calculation for notched display areas, restructuring the status bar height calculation module by optimizing display orientation logic and eliminating redundant dependencies (collaborated)
  [CL 3559567](https://android-review.googlesource.com/c/platform/frameworks/base/+/3559567), [CL 3554263](https://android-review.googlesource.com/c/platform/frameworks/base/+/3554263)

## Industry Experience

**Xiaomi Group**, Beijing -- Software R&D Engineer (Android Framework Kernel), 06/2022 - Present

### Rear Display+ x Miclaw (LLM Agents x OS Integration)
Led exploration of integrating LLM agents into the dual-screen system, investigating AI-driven notification processing, cross-screen information routing, and phone/IoT/vehicle quick-control as new AI x OS interaction scenarios. Built the rear-display integration that brings the LLM agent onto the secondary screen as an AI companion, plus the `manage_pin` tool bridging agent tool calls to real Android system APIs, with code merged into the osbot/miclaw main branch. Prototyped an agent-embodied virtual pet on the rear screen as an alternative to chat-based interaction, and designed context-aware prompt orchestration and tool-selection logic for agents operating under OS-level constraints (permission boundaries, display lifecycle, power management).

### Rear Display+ (Xiaomi 17 Series Dual-Screen Interaction System)
Lead of SubScreenCenter, the rear-display launcher for the Xiaomi 17 series, built on Android's `SECONDARY_HOME` model. Defined and implemented interaction paradigms for a novel display surface where no prior conventions existed, designing context-aware content routing between two opposing displays that users cannot view simultaneously, and addressing how windows, notifications, and authentication should work across physically separated screens. Delivered the core feature modules: the SmartAssistant service panel with its notification transformation engine (initially 14 scenario-specific card types, since extended with LiveUpdate, sports, and template cards), the cross-screen sticky-note (Pin) information-residence system, the AI companion, and contributions to the MiClaw/AppFunction agent-to-OS tool interface. Also designed the permission and authentication model for dual-screen scenarios: which content surfaces on which screen, under what biometric verification, with what temporal constraints. Generated 10+ HCI/system patents. Recognized with Xiaomi's Ten-Million-Dollar Technology Award (Second Prize).

### AI-Native Development Infrastructure (GenAI x R&D Workflow)
Designed and deployed an enterprise-scale agentic AI toolchain augmenting the full software development lifecycle (requirement decomposition, coding, code review, testing, bug repair, maintenance). Built a Skill-Library + MCP-Integration + Prompt-Orchestration architecture in a unified workspace repository, so new engineers inherit the full AI capability set on first clone, and architected the integration layer between agent tool calls and OS-level APIs (file system, process management, build system), addressing latency, isolation, and idempotency in production CI/CD pipelines. Delivered 7 skill workflows, 6 MCP integrations, and 2 specialized agents now in production use across the SubScreenCenter team, which surfaced open research questions in context-aware AI assistance and human-AI collaboration in technical workflows.

### Large-screen Application Casting (EV Infotainment & Cross-device Handoff)
Developed the Android Framework window management layer for Xiaomi's cross-device application casting system, enabling apps to be cast from smartphones to car infotainment screens, tablets, and PCs. Core work involved window lifecycle management, display configuration adaptation, and fault detection and recovery across heterogeneous target devices, together with the cross-device interaction flow: when a user moves from phone to car, which app state transfers, what visual feedback confirms the handoff, and how to degrade gracefully under connectivity loss. Filed multiple patents applying ML to casting fault detection, security and privacy analysis, and intelligent navigation blocking. Recognized with Xiaomi's Ten-Million-Dollar Technology Award (Finalist Prize).

### Dynamic Application Adaptation -- Rule-Based Transformation Framework
Developed a rule-based transformation engine achieving 100% compatibility across heterogeneous display environments. Conducted systematic experiments across 1,000+ device configurations to create a structured taxonomy of adaptation patterns, establishing a new methodological framework for multi-terminal display interactions. The limits of this approach, namely that manual rule authoring does not scale to N form factors, are what motivated the CausalAdapt research project.

### xTS Compliance & Android Ecosystem Standardization
Led the xTS compliance initiative, resolving 150+ critical Window Management System issues across multiple Android releases. Contributed merged code to AOSP affecting 1.5+ billion devices globally, advancing Android ecosystem standards.

### Technical Impact & Mentorship
Contributed 141,339 lines of production code (111,795 to Xiaomi's main Gerrit, 29,544 to GitLab) through rigorous peer and expert review; Gerrit output rose from 45,150 to 111,795 lines after adopting the AI-native development workflow above. Designed and implemented a structured technical onboarding program for junior engineers (2023-2025), with a progressive curriculum covering systems architecture and Android Framework internals that enabled recent graduates to reach technical independence and contribute production-level code within 6 months.

## Technical Skills

+ **Systems**: Android Framework (window and display management, activity and process management, rendering), AOSP, AIDL/Binder IPC, cross-device window and display coordination
+ **AI/ML**: multi-armed bandits (single-author survey), causal-inference framing for UI adaptation (idea origination; algorithm implemented by SCUT collaborators), applied LLM agent tool-use
+ **Data Analytics**: Tableau, Power BI, Weka
+ **Full-Stack**: Vue, Spring, MySQL, Redis, Git

## Honors & Awards

+ **Sci-Tech Innovation Rising Star Award** (2026) -- Xiaomi Group, one of 33 recipients group-wide in a company of roughly 60,000 people (self-nominated, group-reviewed)
+ **Xiaomi Ten-Million-Dollar Technology Award -- Second Prize** (2025) -- Xiaomi 17 Pro Series Rear Display+. Xiaomi's highest engineering award, recognizing the top innovative technology projects of the year (team award; role: core framework R&D developer)
+ **Outstanding Patent Project Award** (2025) -- Intelligent Rear Sub-Screen Delivery, Rear Display+ project (team award; 7 patents as 1st/2nd inventor, 6 as co-inventor)
+ **Xiaomi Role Model Award** (2025 Q4) -- team award
+ **Xiaomi Ten-Million-Dollar Technology Award -- Finalist Prize** (2024) -- Human x Car x Home Handoff (Large-Screen Casting) (team award; role: core framework R&D developer)
+ **Software Division Accelerated Leadership Program** -- First Cohort (2024)
+ **Xiaomi Emerging Engineers Program Candidate** with RSU promotion (2024)
+ **Xiaomi Star Award** -- M-Series Pad Project (2023)
+ Merit Scholarship (2021, HKBU)
+ National Encouragement Scholarship (2017, Ministry of Education of the PRC)
+ Merit Student (2017, SXAU)
+ Second-class Academic Scholarship (2017, SXAU)

## Qualifications & Membership

+ System Architecture Design -- Assistant Engineer Qualification, issued by Chinese Academy of Sciences (CAS)
+ Professional Membership of China Computer Federation (CCF), Technical Committees: Artificial Intelligence & Pattern Recognition, Systems Software, Software Engineering
+ Membership of Institute of Electrical and Electronics Engineers (IEEE)
