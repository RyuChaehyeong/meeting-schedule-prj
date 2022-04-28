function timeValidation(start_dt, end_dt) {
                  
    // validation - 시작시간 < 종료시간 
    if (start_dt >= end_dt) {
      alert('시작시간보다 늦은 종료시간을 선택하세요.');
      return false;
    }

    // validation - 10분 단위
    const startTen = Number(start_dt.substr(start_dt.length-1, 2)) + 10;
    const endTen = Number(end_dt.substr(end_dt.length-1, 2)) + 10;
    if (startTen % 10 !== 0 || endTen % 10 !== 0) {
      alert('예약은 10분 단위로 가능합니다.');
      return false;
    }
    
  }

  function contentValidation(headnum) {
    if(headnum === '' || headnum === null || headnum === undefined){
      alert('회의 참석 인원수를 입력해주세요.');
      return false;
    }
  }