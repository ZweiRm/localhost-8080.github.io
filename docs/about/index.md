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

Hi! I'm Duo Huang, a Software R&D Engineer specializing in Android platform internals (Window Management, Display Pipeline, Activity Management) with a focus on ML-driven system optimization at Xiaomi Inc. I am the technical owner of Xiaomi's dual-screen interaction system (Rear Display+) shipped on the Xiaomi 17 series, and a contributor to the Android Open Source Project (AOSP) with merged changes deployed to 1.5+ billion active devices.

I earned my Master of Science in Data Analysis and Artificial Intelligence from Hong Kong Baptist University (Merit Scholarship) and hold a BEng in Software Engineering from Shanxi Agricultural University (top 5%).

My research interests center on **system software for emerging computing platforms**. As mobile devices evolve from standalone smartphones into hubs that coordinate wearables, extended reality (XR) headsets, vehicle infotainment, and industrial IoT endpoints, the OS and framework layers must manage increasingly heterogeneous hardware, real-time constraints, and cross-device state under tight resource budgets. I am interested in understanding and improving how these system-level mechanisms shape end-to-end user experience across new form factors. Specific areas I hope to explore include:
+ Cross-device system architecture for wearable and XR platforms, where phone-tethered designs create new demands on display management, process scheduling, and real-time communication
+ Context-aware interaction and body-centric interfaces for spatial computing, bridging OS-level sensing with adaptive user experiences
+ Software quality and evolution of large-scale mobile platforms, including automated defect detection, compatibility analysis, and reliability engineering at scale
+ System-level support for intelligent user experience, such as adaptive notification routing, context-sensitive display management, and ML-driven optimization for resource-constrained environments
+ Transfer of large-scale mobile system methodologies (real-time coordination, fault detection, cross-device orchestration) to cyber-physical and industrial contexts

I am currently the project lead of a Xiaomi Open-Competition Research Program (200,000+ CNY funding), an industry-academia collaboration initiative focused on advancing intelligent system architecture. With 19 patents spanning ML-systems integration and HCI innovation, I remain committed to bridging rigorous research with impactful engineering.

## Education

+ **Hong Kong Baptist University (HKBU)**, Hong Kong -- MSc in Advanced Information Systems, 09/2020 - 11/2021
  *(Program currently named MSc in Data Analysis and Artificial Intelligence)*
+ **Shanxi Agricultural University (SXAU)**, Shanxi -- BEng in Software Engineering, 09/2014 - 07/2018

## Research Experience

### Multi-Armed Bandit Algorithms for Preference Learning in Recommendation Systems
Beijing, 12/2023 - 03/2024 | Supervisor: Prof. Osman Yagan, Carnegie Mellon University

Investigated the exploration-exploitation trade-off in food recommendation scenarios with limited user interactions. Developed and validated a novel Upper Confidence Bound (UCB) algorithm variant that balances preference learning efficiency against recommendation accuracy. Designed and implemented a WeChat-based experimental framework for real-world data collection, enabling controlled experiments with human subjects to validate the algorithm's performance against baseline approaches. This work resulted in an IEEE conference publication.

### Xiaomi Open-Competition Research Program ("Jiebang Guashuai" Research Initiative)
2025 | Project Lead | Competitive Research Grant: 200,000+ CNY

Awarded a competitive research grant through Xiaomi's enterprise-wide open-competition research program for innovative technology development. Leading an industry-academia collaboration initiative to advance intelligent system architecture for mobile platforms. The project is currently in the initiation phase with ongoing efforts to establish partnerships with research universities.

## Publication

+ D. Huang, "The Development and Future Challenges of the Multi-armed Bandit Algorithm," *2024 International Conference on Image Processing, Computer Vision and Machine Learning (ICICML)*, Shenzhen, China, 2024, pp. 1922-1930. [DOI: 10.1109/ICICML63543.2024.10957859](https://doi.org/10.1109/ICICML63543.2024.10957859)

### Software Registration
+ D. Huang, et al., "Design and Implementation of Health Management Platform for Special Groups", Registration No. 2018SR796507
+ D. Huang, "Design and Implementation of Online Examination Platform on Java", Registration No. 2018SR611370

## Patents

19 patents in System/HCI and/with ML. Selected highlights below.

### Selected Patents -- Machine Learning with Systems

+ **User Experience-driven Mobile Resource Optimization System Based on Causal Inference** -- Applied causal inference to model and optimize mobile resource allocation, moving beyond correlation-based approaches to identify true causal factors affecting user experience. *(Under review by Xiaomi's IPR)*
+ **Cross-device Adaptive Framework Based on Causal Machine Learning and Multi-task Learning** -- Designed a multi-task learning framework for cross-device application adaptation, enabling shared representation learning across heterogeneous device configurations. *(Under review by Xiaomi's IPR)*
+ **ML-based Viewing Issues Auto-Detecting-Fixing and Relaunching for Application Screencasting** -- application No.: 2025102210572, preliminary review approved by CNIPA
+ **Security and Privacy Detection with ML for Large-Screen Application Casting** -- application No.: 2025105502820, preliminary review approved by CNIPA
+ **Cross-Device Application Flow Dynamic Adaptation with ML-Based Intelligent Sensing** -- application No.: 2025111341262, preliminary review approved by CNIPA
+ **Interconnected Large-Screen Casting Mutual Exclusion Management with ML-Based Proactive Perception** -- application No.: 2025115546401, preliminary review approved by CNIPA

### Selected Patents -- Machine Learning and/with Human-Computer Interaction

+ **Deep Learning-based Notification Fatigue Prediction and Privacy-adaptive Distribution for Dual-screen** -- Developed a deep learning model to predict user notification fatigue and adaptively distribute notifications across dual-screen terminals with privacy-aware policies. *(Under review by Xiaomi's IPR)*
+ **AI Assistant-powered Cross-screen Sticky Notes for Dual-screen Terminals** -- application No.: 2025113509677, preliminary review approved by CNIPA
+ **Intelligent Notification Privacy Management Based on Contextual Awareness** -- application No.: 2025113506310, preliminary review approved by CNIPA
+ **Device Posture-aware Ringing Notification and Intelligent Management for Dual-screen** -- application No.: 2025113675821, preliminary review approved by CNIPA
+ **Multi-layer Spatial Management and Intelligent Display for Dual-screen Notifications** -- application No.: 2025113520869, preliminary review approved by CNIPA
+ **Safe Interaction and Persistence Management for Car Control on Secondary Screen** -- application No.: 2025113509520, preliminary review approved by CNIPA
+ **Application Permission Management Control Framework for Dual-screen Devices** -- application No.: 2025113861990, preliminary review approved by CNIPA
+ **Information Display on Backlit Screen When Screen is Off** -- application No.: 2025113506414, preliminary review approved by CNIPA
+ **Low-Memory Solution for Loading Circular Lists** -- application No.: 2025113506240, preliminary review approved by CNIPA
+ **Dual-Screen Electronic Pet Interaction Solution** -- application No.: 2025113520229, preliminary review approved by CNIPA
+ **Dual-Screen Dual-Desktop Interactive Animation Solution** -- application No.: 2025113500846, preliminary review approved by CNIPA
+ **Unified Facial Recognition Engine for Secondary Screen of Dual-Screen Terminals** -- *(Under review by Xiaomi's IPR)*
+ **Window-Based Distortion Animation Method** -- application No.: 202211691403.6, open to public

## Open Source Contributions

### Android Open Source Project (AOSP), Google

Merged into AOSP main branch, deployed to 1.5+ billion active Android devices worldwide.

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

### Rear Display+ (Xiaomi 17 Series Dual-Screen Interaction System)
Pioneered an independent rear-screen system and software ecosystem for the Xiaomi 17 series, driving smartphone form-factor and interaction innovation. Architected a secondary display Launcher based on Android SECONDARY_HOME with deep Framework customization. Delivered three critical components: *interaction framework adaptation* (dual-screen synchronization, keep-alive, auto-start mechanisms), *intelligent Service Assistant* (SystemUI notification transformation engine supporting 14 scenario-specific cards including music, navigation, and fitness), and *cross-screen sticky notes* (AI assistant integration with pioneering transition animations). Generated 10+ HCI/system patents, establishing industry-leading standards for dual-screen interaction paradigms. Recognized with Xiaomi's Ten-Million-Dollar Technology Award (Second Prize).

### Large-screen Application Casting (EV Infotainment & Cross-device Handoff)
Developed the Android Framework window management layer for Xiaomi's cross-device application casting system, enabling apps to be cast from smartphones to car infotainment screens, tablets, and PCs. Core work involved window lifecycle management, display configuration adaptation, and multi-window scheduling for cast sessions across heterogeneous target devices. Filed multiple patents applying ML to casting fault detection, security/privacy analysis, and intelligent navigation blocking. Recognized with Xiaomi's Ten-Million-Dollar Technology Award (Finalist Prize).

### Dynamic Application Adaptation -- Rule-Based Transformation Framework
Developed a rule-based transformation engine achieving 100% compatibility across heterogeneous display environments. Conducted systematic experiments across 1,000+ device configurations to create a structured taxonomy of adaptation patterns, establishing a new methodological framework for multi-terminal display interactions.

### xTS Compliance & Android Ecosystem Standardization
Led xTS compliance initiative, resolving 150+ critical Window Management System issues across multiple Android releases. Contributed merged code to AOSP affecting 1.5+ billion devices globally, advancing Android ecosystem standards.

### Technical Impact & Mentorship
Technical owner of multiple Android Framework subsystems across Xiaomi's main Gerrit-managed and GitLab repositories, with all changes passing rigorous expert code reviews and comprehensive testing verification. Designed and implemented a structured technical onboarding program for junior engineers (2023-2025), developing a progressive curriculum covering systems architecture and Android Framework internals that enabled recent graduates to achieve technical independence and contribute to production-level code within 6 months.

## Honors & Awards

+ **Xiaomi Ten-Million-Dollar Technology Award -- Second Prize** (2025) -- Xiaomi 17 Pro Rear Display+. Xiaomi's highest engineering award recognizing top innovative technology projects of the year.
+ **Outstanding Patent Project Award** (2025) -- Intelligent Rear Sub-Screen Delivery. 7 patents as 1st/2nd inventor, 6 as co-inventor.
+ **Xiaomi Role Model Award** (2025 Q4)
+ **Xiaomi Ten-Million-Dollar Technology Award -- Finalist Prize** (2024) -- Human x Car x Home Handoff (Large-Screen Casting)
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