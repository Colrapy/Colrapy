"""
* 스트레스 질문(PSS-10)에서 랜덤으로 5가지 질문 뽑기
* csv 파일 읽고 쓰기
* dataframe 랜덤 이용 참고: https://zephyrus1111.tistory.com/49
"""

import pandas as pd

df = pd.read_csv('data_csv/stress_question.csv', encoding='utf-8')   # csv -> dataFrame 변환
random5 = df.sample(n=5, replace=False)                              # 비복원으로 랜덤5개 추출

random5.to_csv('data_result/stress_random5.csv', header=False, index=False, encoding='utf-8-sig')  # 결과 csv 저장
