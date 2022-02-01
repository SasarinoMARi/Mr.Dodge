# Mr.Dodge
<img src="https://github.com/SasarinoMARi/Mr.Dodge/blob/master/preview.jpg?raw=true" width="50%">

미스터 닷지는 칼바람 나락 챔피언별 승률/티어 통계를 쉽게 확인할 수 있게 도와주는 봇입니다.


## 설치 방법

### 디스코드 봇 생성
[디스코드 공식 봇 생성 가이드](https://discordjs.guide/preparations/setting-up-a-bot-application.html)에 따라 봇 계정을 생성합니다.

### 서버측
0. node 버전이 16.6 이상인지 확인합니다.
1. 레포지토리 루트에 analytics 폴더를 만들고 그 안에 aram 폴더와 urf 폴더를 만듭니다.
2. secret.json 파일을 만들고 안에 discord bot 토큰을 저장합니다...    {"token":"토큰값"}
3. npm install 명령어로 설치 후
4. node index.js로 실행합니다.


## 봇 사용법
봇을 서버에 추가한 뒤 다음 두 명령어를 사용할 수 있습니다.
```
!칼 챔피언이름1 챔피언이름2 챔피언이름3 ... : 각 챔피언별 칼바람 나락 통계를 가져옵니다.
!우 챔피언이름1 챔피언이름2 챔피언이름4 ... : 각 챔피언별 우르프 통계를 가져옵니다.
```
