# 디자인 시스템 리뷰 보고서 (Open Lecture)

본 보고서는 `36-design-system` 전문 에이전트 팀이 현재 프로젝트의 UI/UX 구조를 분석한 결과입니다.

---

## 🎨 Token Designer (디자인 토큰 분석)

### 현재 상태
- **색상**: `:root`에 `--color-primary`, `--color-bg` 등 시맨틱 토큰이 잘 정의되어 있습니다.
- **다크모드**: 처음부터 다크 모드 기반으로 설계되어 일관성이 높습니다.
- **반지름**: `--radius-md` 등 단계별 상수가 정의되어 있습니다.

### 개선 제안
1. **Spacing 토큰 부재**: 현재 `padding: 24px`, `margin: 0 auto` 등 하드코딩된 값이 많습니다. `--spacing-sm: 8px`, `--spacing-md: 16px` 등의 스케일 도입이 필요합니다.
2. **Typography 토큰 부재**: `font-size: 1.8rem`, `fontWeight: 800` 등이 인라인으로 작성되어 있습니다. `--text-h1`, `--text-body` 등으로 추상화가 필요합니다.
3. **Shadow 토큰 부재**: 글래스모피즘 효과에 사용되는 그림자 값이 스타일링 코드 내에 산재해 있습니다.

---

## 🏗️ Component Developer (컴포넌트 구조 분석)

### 현재 상태
- **인라인 스타일 의존성**: `page.tsx`, `layout.tsx`에서 `style={{ ... }}`을 통해 스타일을 제어하고 있습니다.
- **글로벌 클래스**: `.glass-card`, `.btn-primary` 등 유용한 유틸리티가 `globals.css`에 정의되어 있습니다.

### 개선 제안
1. **컴포넌트 추출**: 현재 `page.tsx`에 포함된 `CourseCard`, `CategoryCard`, `SearchBar`, `Badge` 등을 `src/components/atoms` 및 `molecules`로 분리해야 합니다.
2. **Props 기반 변형**: 스타일을 인라인으로 정의하는 대신, `variant`, `size` props를 받는 정형화된 컴포넌트 라이브러리 구축이 필요합니다.
3. **Headless 패턴**: 검색 로직과 UI를 분리하여 재사용성을 높여야 합니다.

---

## ♿ A11y Auditor (접근성 검증)

### 현재 상태
- **시맨틱 HTML**: `header`, `main`, `footer`, `section` 등을 적절히 사용하여 문서 구조가 명확합니다.
- **대비비**: 다크 모드 배경 대비 텍스트 색상이 선명합니다.

### 개선 제안
1. **ARIA 속성 누락**: 검색 `input`에 `aria-label`이 없으며, 아이콘으로 사용된 이모지(📚, 🔍)에 대한 스크린 리더 배려가 부족합니다. (`role="img" aria-label="..."`)
2. **포커스 표시자**: 기본 브라우저 포커스 링 대신, 브랜드 컬러(`--color-primary`)를 활용한 명확한 포커스 스타일이 필요합니다.
3. **인터랙션 피드백**: 필터 버튼 클릭 시 상태 변화가 스크린 리더에게 `aria-pressed` 등으로 전달되지 않습니다.

---

## 🚀 종합 권장 로드맵

1. **Step 1**: `globals.css`에 Spacing 및 Typography 토큰 확장 정의
2. **Step 2**: 공통 UI 컴포넌트(Atom/Molecule) 추출 및 `src/components` 구조화
3. **Step 3**: 접근성 속성(ARIA) 및 키보드 네비게이션 보완
4. **Step 4**: 스토리북(Storybook) 도입을 통한 컴포넌트 카탈로그화
