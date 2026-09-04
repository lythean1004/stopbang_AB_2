# STOP-BANG A/B 테스트 Variant B

> 배포 URL: 배포 후 기록

실제 의료 서비스가 아닌 한국어 목업입니다. Variant B는 STOP-BANG 결과 뒤에 교육 원페이저와 대칭적인 예약 방식 선택을 제공합니다.

## 실행

```bash
npm install
npm run dev
npm run lint
npm run build
```

`?demo=1`을 붙이면 5점(고위험) 상태로 모든 후속 페이지를 확인할 수 있습니다. 이벤트는 브라우저 `localStorage`의 `ab_events_v1`과 `/api/track` 콘솔에 저장됩니다.

## 플로우

```text
/ 인트로 → 8문항 퀴즈
  ├─ 0~2점 → /low-risk (퍼널 제외)
  └─ 3~8점 → /learn → /choose
                         ├─ /self → 병원 검색 → 공통 폼 ┐
                         └─ /assist → 안내/FAQ → 공통 폼 ┴→ /done
```

## 이벤트 스키마

모든 이벤트의 공통 필드는 `variant`, `sessionId`, `ts`, `path`, `stepIndex`, `event`, `props`입니다.

| 구분 | 이벤트 |
|---|---|
| 공통 | `session_start`, `intro_view`, `quiz_start`, `quiz_answer`, `quiz_complete`, `step_view`, `cta_click`, `form_start`, `form_field_blur`, `form_submit`, `funnel_complete`, `page_exit` |
| Variant B | `learn_scroll_depth`, `learn_section_view`, `choose_view`, `choose_select`, `clinic_search`, `clinic_result_click`, `assist_faq_open` |

`/debug`에서 이벤트 테이블 확인, JSON 복사, CSV 다운로드, 초기화가 가능하며 검색엔진 색인은 차단됩니다.

## Variant A와 다른 점

Variant B는 중등도·고위험 결과 후 4개 교육 섹션의 스크롤형 원페이저를 제공하고, 직접 예약과 예약 지원을 시각적으로 동일한 두 카드로 선택하게 합니다. 디자인 토큰, STOP-BANG 문항, 결과 블록, 공통 예약 폼 및 이벤트 공통 스키마는 Variant A와 동일하다는 명세를 따릅니다.

## 디자인 토큰

| 항목 | 값 |
|---|---|
| 폰트 | Pretendard, `-apple-system`, `system-ui`, `sans-serif` |
| 색상 | `#FFFFFF`, `#F7F8FA`, `#111827`, `#6B7280`, `#E5E7EB`, `#2563EB`, `#1D4ED8`, `#EFF6FF`, `#DC2626`, `#059669` |
| 타이포 | h1 24/700, h2 20/700, body 16/400/1.6, caption 13/400 |
| 컨테이너 | max 480px, 좌우 20px, 상단 16px, 하단 40px |
| 라운드 | 카드 16px, 버튼·입력 12px, 배지 999px |
| 그림자 | `0 1px 2px rgba(17,24,39,0.06)` |

## 교체 필요 플레이스홀더

- `[보험·비용 안내 문구]`, `[출처 확인 필요]`
- `[VAK_HERO_COPY]`, `[VAK_BENEFIT_1]`, `[VAK_BENEFIT_2]`, `[VAK_BENEFIT_3]`, `[VAK_FEE_NOTICE]`
- `[VAK_FAQ_1_Q]`, `[VAK_FAQ_1_A]`, `[VAK_FAQ_2_Q]`, `[VAK_FAQ_2_A]`

## 가정

- Variant A 저장소가 제공되지 않아, 명세에 적힌 토큰과 공용 컴포넌트 수치를 Variant A의 기준으로 간주했습니다.
- 첨부 이미지는 외부 서비스 참고 화면이며 구현 지시나 복제 대상이 아닌 것으로 간주했습니다.
- 진료·병원·가격·보험 정보는 생성하지 않고 명시된 더미 또는 플레이스홀더만 사용했습니다.
- 옵션 무작위화 플래그 기본값은 `false`이며 `true`일 때 세션에 순서를 저장합니다.

## 인증 실패 시 실행 명령

```bash
gh auth login
git push -u origin main
vercel login
vercel link --project stopbang-ab-2
vercel --prod
```

Vercel CLI를 사용할 수 없다면 Vercel 대시보드에서 **Add New → Project → `lythean1004/stopbang_AB_2` Import → Framework Preset: Next.js → Deploy** 순서로 배포합니다.
