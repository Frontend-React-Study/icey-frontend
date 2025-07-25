import { useState, useEffect, useRef } from "react";
import st from "./Teamlist.module.css";
import Button from "../Button";
import Teambutton from "./Teambutton";
import Teamcreate from "./Teamcreate";

const Teamlist = ({
  teams,
  onLinkClick,
  onTeamCheckClick,
  onTeamAdd,
  selectedTeamId,
}) => {
  const [showCreate, setShowCreate] = useState(false);
  const [teamName, setTeamName] = useState(""); // 입력값 상태
  const contentRef = useRef(null);

  // 엔터키를 눌렀을 때 입력 받기
  // const [inputText, setInputTest] = useState("");
  const activeEnter = (e) => {
    if (e.key === "Enter") {
      handleCreateClick();
    }
  };

  const handleCreateClick = () => {
    if (showCreate && teamName.trim()) {
      console.log("입력된 팀 이름:", teamName); // ✅ 프론트에서 확인용 출력

      onTeamAdd(teamName);
      setShowCreate(false); // 입력 폼 닫기
      setTeamName(""); // 입력 초기화
    } else {
      setShowCreate(true); // 처음 클릭 시 폼만 열기
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (contentRef.current && !contentRef.current.contains(e.target)) {
        setShowCreate(false);
        setTeamName("");
      }
    };

    window.addEventListener("mousedown", handleOutsideClick);
    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className={st.Teamlist_content} ref={contentRef}>
      <div className={st.Teamlist_space}>
        {showCreate ? (
          <Teamcreate
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            onKeyDown={(e) => activeEnter(e)}
          />
        ) : !teams || teams.length === 0 ? (
          <>
            <div>현재 생성된 팀이 없습니다.</div>
          </>
        ) : (
          <>
            {teams.map((team) => (
              <Teambutton
                teamname={team.teamName}
                dday={team.dday ? team.dday : ""}
                isCheck={team.id === selectedTeamId}
                onClick={() => onTeamCheckClick(team.id)}
                linkonClick={() => onLinkClick(team.id)}
              />
            ))}
          </>
        )}
      </div>

      <div className={st.Teamlist_button_space}>
        <Button text="팀 생성" type="mid" onClick={handleCreateClick} />
      </div>
    </div>
  );
};

export default Teamlist;
