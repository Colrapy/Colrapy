import React, { useState } from 'react';
import styles from './join.module.css';
import Button from '../../button';

const Join = (props) => {
    const [email, set_email] = useState('');
    const [username, set_username] = useState('');
    const [password, set_password] = useState('');
    const [password_check, set_password_check] = useState('');
    const [password_error, set_password_error] = useState('');
    const [age, set_age] = useState('');

    const info_box1_content = `
    < colrapy >('www.colrapy.com'이하 'colrapy')은(는) 「개인정보 보호법」 제30조에 따라 정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.
    ○ 이 개인정보처리방침은 2022년 6월 1부터 적용됩니다.
    제1조(개인정보의 처리 목적)
    < colrapy >('www.colrapy.com'이하 'colrapy')은(는) 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며 이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
    1. 홈페이지 회원가입 및 관리
    회원 가입의사 확인 목적으로 개인정보를 처리합니다.
    \n\n
    제2조(개인정보의 처리 및 보유 기간)
    ① < colrapy >은(는) 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
    ② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.
    1.<홈페이지 회원가입 및 관리>
    <홈페이지 회원가입 및 관리>와 관련한 개인정보는 수집.이용에 관한 동의일로부터<영구>까지 위 이용목적을 위하여 보유.이용됩니다.
    보유근거 : 추천 알고리즘은 회원님께서 제공해주신 정보를 기반으로 이루어집니다.
    관련법령 :
    예외사유 : 탈퇴일을 기점으로 1년간 보관 후, 개인정보가 자동으로 파기됩니다.

    제3조(처리하는 개인정보의 항목)
    ① < colrapy >은(는) 다음의 개인정보 항목을 처리하고 있습니다.
    1< 홈페이지 회원가입 및 관리 >
    필수항목 : 이메일, 비밀번호, 로그인ID, 이름, 나이
    선택항목 :

    제6조(개인정보의 파기절차 및 파기방법)
    ① < colrapy > 은(는) 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.
    ② 정보주체로부터 동의받은 개인정보 보유기간이 경과하거나 처리목적이 달성되었음에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야 하는 경우에는, 해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다.
    1. 법령 근거 :
    2. 보존하는 개인정보 항목 : 계좌정보, 거래날짜

    ③ 개인정보 파기의 절차 및 방법은 다음과 같습니다.
    1. 파기절차
    < colrapy > 은(는) 파기 사유가 발생한 개인정보를 선정하고, < colrapy > 의 개인정보 보호책임자의 승인을 받아 개인정보를 파기합니다.

    제7조(정보주체와 법정대리인의 권리·의무 및 그 행사방법에 관한 사항)
    ① 정보주체는 colrapy에 대해 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다.
    ② 제1항에 따른 권리 행사는colrapy에 대해 「개인정보 보호법」 시행령 제41조제1항에 따라 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며 colrapy은(는) 이에 대해 지체 없이 조치하겠습니다.
    ③ 제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다.이 경우 “개인정보 처리 방법에 관한 고시(제2020-7호)” 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.
    ④ 개인정보 열람 및 처리정지 요구는 「개인정보 보호법」 제35조 제4항, 제37조 제2항에 의하여 정보주체의 권리가 제한 될 수 있습니다.
    ⑤ 개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수 없습니다.
    ⑥ colrapy은(는) 정보주체 권리에 따른 열람의 요구, 정정·삭제의 요구, 처리정지의 요구 시 열람 등 요구를 한 자가 본인이거나 정당한 대리인인지를 확인합니다.

    제8조(개인정보의 안전성 확보조치에 관한 사항)
    < colrapy >은(는) 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.
    1. 개인정보의 암호화
    이용자의 개인정보는 비밀번호는 암호화 되어 저장 및 관리되고 있어, 본인만이 알 수 있으며 중요한 데이터는 파일 및 전송 데이터를 암호화 하거나 파일 잠금 기능을 사용하는 등의 별도 보안기능을 사용하고 있습니다.
    2. 개인정보에 대한 접근 제한
    개인정보를 처리하는 데이터베이스시스템에 대한 접근권한의 부여,변경,말소를 통하여 개인정보에 대한 접근통제를 위하여 필요한 조치를 하고 있으며 침입차단시스템을 이용하여 외부로부터의 무단 접근을 통제하고 있습니다.

    제9조(개인정보를 자동으로 수집하는 장치의 설치·운영 및 그 거부에 관한 사항)
    ① colrapy 은(는) 이용자에게 개별적인 맞춤서비스를 제공하기 위해 이용정보를 저장하고 수시로 불러오는 ‘쿠키(cookie)’를 사용합니다.
    ② 쿠키는 웹사이트를 운영하는데 이용되는 서버(http)가 이용자의 컴퓨터 브라우저에게 보내는 소량의 정보이며 이용자들의 PC 컴퓨터내의 하드디스크에 저장되기도 합니다.
    가. 쿠키의 사용 목적 : 이용자가 방문한 각 서비스와 웹 사이트들에 대한 방문 및 이용형태, 인기 검색어, 보안접속 여부, 등을 파악하여 이용자에게 최적화된 정보 제공을 위해 사용됩니다.
    나. 쿠키의 설치•운영 및 거부 : 웹브라우저 상단의 도구>인터넷 옵션>개인정보 메뉴의 옵션 설정을 통해 쿠키 저장을 거부 할 수 있습니다.
    다. 쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이 발생할 수 있습니다.

    제10조(행태정보의 수집·이용·제공 및 거부 등에 관한 사항)
    행태정보의 수집·이용·제공 및 거부등에 관한 사항
    <개인정보처리자명>은(는) 온라인 맞춤형 광고 등을 위한 행태정보를 수집·이용·제공하지 않습니다.

    제11조(추가적인 이용·제공 판단기준)
    < colrapy > 은(는) ｢개인정보 보호법｣ 제15조제3항 및 제17조제4항에 따라 ｢개인정보 보호법 시행령｣ 제14조의2에 따른 사항을 고려하여 정보주체의 동의 없이 개인정보를 추가적으로 이용·제공할 수 있습니다.
    이에 따라 < colrapy > 가(이) 정보주체의 동의 없이 추가적인 이용·제공을 하기 위해서 다음과 같은 사항을 고려하였습니다.
    ▶ 개인정보를 추가적으로 이용·제공하려는 목적이 당초 수집 목적과 관련성이 있는지 여부
    ▶ 개인정보를 수집한 정황 또는 처리 관행에 비추어 볼 때 추가적인 이용·제공에 대한 예측 가능성이 있는지 여부
    ▶ 개인정보의 추가적인 이용·제공이 정보주체의 이익을 부당하게 침해하는지 여부
    ▶ 가명처리 또는 암호화 등 안전성 확보에 필요한 조치를 하였는지 여부
    ※ 추가적인 이용·제공 시 고려사항에 대한 판단기준은 사업자/단체 스스로 자율적으로 판단하여 작성·공개함
    `;

    return (
        <div className={styles.join_form}>
            <h1 className={styles.page_title}>회원가입</h1>
            <form>
                <div className={styles.email_box}>
                    <label htmlFor="user_email">이메일</label> <p />
                    <input name='user_email' value={email} required />
                </div>

                <div className={styles.username_box}>
                    <label htmlFor="user_username">이름 및 닉네임</label> <p />
                    <input name='user_username' value={username} required />
                </div>

                <div className={styles.password_box}>
                    <label htmlFor="user_password">비밀번호</label> <p />
                    <input name='user_password' value={password} required />
                </div>

                <div className={styles.password_check_box}>
                <label htmlFor="user_password_check">비밀번호체크</label><br/> <p />
                    <input name="user-password-user_password_check" type="password" value={password_check} required />
                    {password_error && <div>비밀번호가 일치하지 않습니다.</div>}
                </div>
    
                <div className={styles.age_box}>
                    <label htmlFor="user_age">나이</label> <p />
                    <input name='user_age' value={age} required />
                </div>

                <div className={styles.info_box1}>
                    <label htmlFor="check_box1">개인정보처리방침</label> <p />
                    <div className={styles.info_content}>{info_box1_content}</div>
                    <div className={styles.check_box1}>
                        <div className={styles.info}>(필수) 개인정보처리 방침에 동의합니다.</div>
                        <input type='checkbox' className={styles.check_button}></input>
                    </div>
                </div>

                <div className={styles.info_box2}>
                    <label htmlFor="check_box2">이용약관</label> <p />
                    <div className={styles.info_content}>{info_box1_content}</div>
                    <div className={styles.check_box2}>
                        <div className={styles.info}>(필수) 이용약관에 동의합니다. </div>
                        <input type='checkbox' className={styles.check_button}></input>
                    </div>
                </div>
            </form>
            <Button content={'회원가입하기'}/>
        </div>
    );
}

export default Join;