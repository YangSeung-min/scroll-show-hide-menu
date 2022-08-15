import { useCallback, useEffect, useRef, useState } from "react";
import "./styles.css";

export default function App() {
  const [isActive, setIsActive] = useState(false);
  const scrollPosition = useRef(0);
  const content = [];
  for (let i = 0; i < 40; i++) {
    content.push(<h2>...</h2>);
  }

  const handleScroll = useCallback(() => {
    const position = window.pageYOffset;
    // const { clientHeight, scrollHeight } = document.body;
    // const { scrollY } = window;

    //최하단에 있을 경우 애니메이션 없음
    // if (
    //   scrollPosition.current !== 0 &&
    //   Math.ceil(scrollY + clientHeight) >= scrollHeight
    // ) {
    //   return;
    // }

    if (position < scrollPosition.current) {
      //현재 위치가 이전 위치보다 낮을때 (스크롤 내렸을때 헤더 푸터 사라짐)
      setIsActive(true);
    } else {
      //현재 위치가 이전 위치보다 높을때 (스크롤 올렸을때 헤더 푸터 나타남)
      setIsActive(false);
    }

    scrollPosition.current = position;
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, {
      passive: true
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  let topClassName = "top";
  if (!isActive) {
    topClassName += " hide";
  }

  let bottomClassName = "bottom";
  if (!isActive) {
    bottomClassName += " hide";
  }

  return (
    <div className="App">
      <section className={topClassName} />
      <h1>Scroll menu test</h1>
      <h2>
        모바일 환경에서 아래로 스크롤 하면 보이고 위로 스크롤하면 사라지는
        네이게이션 샘플
      </h2>
      {content.map((item) => item)}
      <section className={bottomClassName} />
    </div>
  );
}
