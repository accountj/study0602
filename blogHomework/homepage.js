function insertComment() {
    if(localStorage.getItem("seq") == null) {
        localStorage.setItem("seq", 0);
    }

    // 데이터 담을 배열 준비
    const commentStr = localStorage.getItem("comment");
    let commentArr = JSON.parse(commentStr);
    if(commentArr == null) {
        commentArr = [];
    }

    // 넣을 데이터 (no, nickname, comment, date)
    let no = localStorage.getItem("seq");
    localStorage.setItem("seq", ++no);
    const nickname = document.querySelector("#nickname").value;
    const comment = document.querySelector("#mycomment").value;
    const date = new Date();

    // 넣을 데이터 객체로 뭉쳐줌
    let commentObj = {
        no ,
        nickname ,
        comment ,
        date ,
    }

    // 객체 배열에 넣어주고 json 문자열로 변환해서 로컬스토리지에 넣어준다
    commentArr.push(commentObj);
    localStorage.setItem("comment", JSON.stringify(commentArr));
    
    alert('댓글이 등록되었습니다.');
}

function updateComment(no) {
    const nickname = document.querySelector("#nickname").value;
    const comment = document.querySelector("#mycomment").value;
    const date = new Date();

    const commentStr = localStorage.getItem("comment");
    let commentArr = JSON.parse(commentStr);

    const index = commentArr.findIndex(comment => comment.no === no);

    if (index !== -1) {
        commentArr[index].nickname = nickname;
        commentArr[index].comment = comment;
        commentArr[index].date = date;
    } else {
        let commentObj = {
            no,
            nickname,
            comment,
            date,
        };
        commentArr.push(commentObj);
    }

    localStorage.setItem("comment", JSON.stringify(commentArr));
    alert(no + '번 댓글이 수정되었습니다. 조회 버튼을 눌러 확인해주세요.');
}

function selectComment() {
    const h3 = document.querySelector("h3");
    if(h3) {
        h3.remove();
    }
    
    const commentStr = localStorage.getItem("comment");
    let commentArr = JSON.parse(commentStr);

    const commTable = document.querySelector("#commnet-table");
    commTable.innerHTML = '';

    for(let data of commentArr) {
        const no = data.no;
        const nickname = data.nickname;
        const comment = data.comment;
        const date = data.date;

        const row = document.createElement("tr");
        row.classList.add("highlight");

        row.innerHTML = `
            <td id="no">${data.no}</td>
            <td class="comnt-id">${data.nickname}</td>
            <td class="comnt-date">${data.date}</td>
            <td class="report">
                <button id="update-button" onclick="updateComment(${no});">수정</button>
                <button id="delete-button" onclick="deleteComment(${no});">삭제</button>
            </td>
        `;
    
        const commentRow = document.createElement("tr");
        commentRow.innerHTML = `
            <td colspan="3" class="comnt-comment">${data.comment}</td>
        `;
    
        commTable.appendChild(row);
        commTable.appendChild(commentRow);
    }

}

function deleteComment(no) {
    console.log(no); 

    const commentStr = localStorage.getItem("comment");
    let commentArr = JSON.parse(commentStr);

    for(let i = 0; i < commentArr.length; i++) {
        if(commentArr[i].no == no) {
            commentArr.splice(i, 1);
        }
    }

    localStorage.setItem("comment", JSON.stringify(commentArr));

    alert(`${no}번 댓글이 삭제되었습니다. 조회 버튼을 눌러 확인해주세요.`);
}


function login() {
    const id = document.querySelector("#id").value;
    const pwd = document.querySelector("#pwd").value;

    console.log(id + "/" + pwd);

    if(id === "admin" && pwd === "1234") {
        const loginForm = document.querySelector(".login-form");
        const messageElement = document.querySelector("#welcomeMessage");
    
    
        // 로그인 폼 숨기기
        loginForm.classList.add("hidden");
    
        // 환영 메시지 표시
        messageElement.classList.add("welcome");
        messageElement.textContent = id + "님 환영합니다!";
    } else {
        alert("아이디/비밀번호를 확인해주세요.");
        return false;
    }
}
