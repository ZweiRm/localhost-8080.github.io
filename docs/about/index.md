---
editLink: false
sidebar: false
comment: false
---

# About Me
<script setup>
import { VPTeamMembers } from 'vitepress/theme'

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
            link: 'momg@foxmail.com'
        }
    ],
  },
]
</script>

<VPTeamMembers size="medium" :members="members" />

Hi! I'm Duo Huang, currently working as a Software R&D Engineer specializing in Android framework development and machine learning integration at Xiaomi Inc. My professional work centers on advancing the Android ecosystem, particularly focusing on (Display & Window Management, Process & Activity Management, Rendering & Drawing with the aim of enhancing user experience through innovative system architecture and optimized algorithmic solutions.  

I earned my Master of Science in Data Analysis and Artificial Intelligence degree from Hong Kong Baptist University, where I received a Merit Scholarship for my academic performance. My research interests primarily include Systems with AI, Mobile Software Engineering, Software Architecture, Cloud Computing, Reinforcement Learning, and Deep Learning.  

My academic and practical experiences include numerous patents in advanced application casting technologies and dynamic link switching methods. Additionally, I have led Xiaomi's xTS compliance initiatives, significantly contributing to Google's Android ecosystem standards and resolving critical ecosystem issues.  

I remain committed to driving technological advancement through rigorous research, active collaboration, and continuous contributions to the open-source community. One of the most fulfilling experiences is knowing that my code positively impacts nearly every Android device around the globe. I've significantly contributed to the Android Open Source Project (AOSP), specifically in areas of display spatial logic, cutout management, and system robustness improvements, positively influencing billions of devices globally. Moving forward, I aim to continue bridging academia and industry, advancing technological innovations, and contributing meaningfully to global scientific and technological progress.  

## Publication & Patent
+ Patent: Duo Huang, Heli Li, “A Screen Casting Method, Screen Casting Device, Electronic Device, Storage Medium and Programme Product (A Machine Learning and Configuration- based Viewing Issues Auto-Detecting-Fixing and Relaunching Method for Application Screencasting)”, application No.: 2025102210572
+ Patent: Duo Huang, “A Method of Security and Privacy Detection and Application Navigation Blocking for Large-Screen Application Casting with Machine Learning Approachd”
+ Patent: Duo Huang, Yan Zhang, “A Large-screen-casting Application Transferring and Adapting Method”
+ Patent: Duo Huang, Deqing Zhu, “A Dynamic Link Switching Method for Multi-Device Handoff Service of Large Screen Application Casting”
+ Patent: Ruyue Geng, Duo Huang, etl., “Window Warping Method, Device, Storage Medium, and Chip (A Window-Based Distortion Animation Method)”, application No.: 202211691403.6, open to public
+ Software Publication: Duo Huang, etl., “Design and Implementation of Health Management Platform for Special Groups”, 2018SR796507, Software Registration No. 3125602
+ Software Publication: Duo Huang, “Design and Implementation of Online Examination Platform on Java”, 2018SR611370, Software Registration No. 2940465

## Open Source Project Contributions
### Android Open Source Project (AOSP), Google
+ Redesigned display spatial logic to dynamically integrate widget/camera cutouts, eliminating layout misalignments in multi-cutout environments  
  Gerrit CLs: https://android-review.googlesource.com/c/platform/cts/+/3026725
+ Designed robust validation logic with dynamic tolerance, eliminating precision loss in mirrored activity calculations and enhancing system stability in Media Projection-related testing  
  Gerrit CLs: https://android-review.googlesource.com/c/platform/cts/+/3309476
+ Streamlined cutout calculations in WindowManagerAnimation by removing coupling and establishing unidirectional data flow for consistent cross-cutout configurations  
  Gerrit CLs: https://android-review.googlesource.com/c/platform/cts/+/3505814
+ Designed robustness logic with dynamic cutout calculation for system bar (collaboration)  
  Gerrit CLs: https://android-review.googlesource.com/c/platform/frameworks/base/+/3554263
### VuePress, Vue
+ Localized project documentation, making corrections for any errors found within it
  GitHub Pull Request: https://github.com/vuejs/vuepress/pull/2934

## Key Projects
+ Large-screen Application Casting (Electic Vehicles Infotainment Systems & Cross-device Handoff)
+ Dynamic Application Adaptation in Various Display Environments by Systems: A Rule-Based Transformation Framework
+ Display Geometry Optimization for Non-Rectangular Interfaces - On-Display Camera Configuration
+ xTS Compliance & Android Ecosystem Standardization

Contributed over 45,000 lines of code to company repositories (34,213 lines to main Gerrit-managed codebase and 11,478 lines to secondary GitLab repository) over tenure in Xiaomi HyperOS (previously, MIUI), with all changes passing rigorous expert code reviews and comprehensive testing verification.

## Honors & Awards
+ Xiaomi Ten-Million-Dollar Technology Award (of the Year) Finalist Prize - (Human x Car x Home Handoff (Large-Screen Casting)
+ Xiaomi Star Award (M-Series Pad Project)
+ Merit Scholarship
+ National Encouragement Scholarship
+ Merit Student
+ Second-class Academic Scholarship

## Qualifications & Membership
+ System Architecture Design - Assistant Engineer Qualification, issued by Chinese Academy of Sciences (CAS)
+ Professional Membership of China Computer Federation (CCF), Technical Committees including Artificial Intelligence & Pattern Recognition Committee, Systems Software Committee, Software Engineering Committee
+ Membership of Institute of Electrical and Electronics Engineers (IEEE)

## Web Projects
### A Web Based Java Online Judge System
[Gitee Repository](https://gitee.com/lagee_online_quizing)

### Ahza Health Care Platform for Individuals
[Github Repository](https://github.com/ZweiRm/ahza_health_mixfront)

### Ahza Coupon
<s>[Website](https://coupon.ahza.xin/)</s> (Currently could not access)