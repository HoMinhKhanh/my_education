import React from 'react';
import { WrapperButtonHover } from '../HomePage/style';
import { Wrapper, WrapperContainer, WrapperContainers } from './style';
import { useNavigate } from 'react-router-dom';


const LearningPathsPage = () => {
  const navigate = useNavigate()
  return (
    <WrapperContainer>
      <div>
          <h1>Lộ trình học</h1>
      </div>
      <div>
        <p style={{fontSize:'1.5rem',lineHeight:'1.6',maxWidth:'840px'}}>Để bắt đầu một cách thuận lợi, bạn nên tập trung vào một lộ trình học. Ví dụ: Bạn muốn học tốt và chuyên về môn toán bạn nên
          tập trung vào môn toán một cách nhiều nhất </p>
      </div>
      <br />
      <WrapperContainers>
        <Wrapper >
          <h2>Lộ trình học Toán</h2>
          <p>Để học Toán hiệu quả, bắt đầu bằng việc xác định mục tiêu học của bạn, có thể là cải thiện điểm số, 
            chuẩn bị cho kỳ thi quan trọng, hoặc đơn giản là hiểu rõ hơn về một chủ đề cụ thể. </p>
          <WrapperButtonHover textButton={'Xem thêm'}
            onClick={() => navigate('/LearningPaths/Toan')}
             type={'default'} 
                        styleButton={{
                            fontSize: '1.6rem',
                            marginTop: '16px',
                            minWidth: '180px',
                            backgroundColor: '#f05123',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '16px',
                            height: '36px',
                            fontWeight: '600',
                        }}
                    />
        </Wrapper>
        <Wrapper>
          <h2>Lộ trình học Sinh</h2>
          <p>Để xây dựng một lộ trình học tập hiệu quả cho môn Sinh học, trước hết, hãy xác định mục tiêu học của bạn. Có thể bạn muốn cải thiện kiến thức cơ bản, 
            chuẩn bị cho kỳ thi quan trọng, hoặc thậm chí là nghiên cứu sâu hơn về một lĩnh vực cụ thể của Sinh học.</p>
          <WrapperButtonHover textButton={'Xem thêm'} type={'default'} onClick={() => navigate('/LearningPaths/Sinh')}
                        styleButton={{
                            fontSize: '1.6rem',
                            marginTop: '16px',
                            minWidth: '180px',
                            backgroundColor: '#f05123',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '16px',
                            height: '36px',
                            fontWeight: '600',
                        }}
                    />
        </Wrapper>
        <Wrapper >
          <h2>Lộ trình học Hoá</h2>
          <p>Để xây dựng một lộ trình học môn Hóa hiệu quả, trước hết, bạn cần xác định mục tiêu học của mình. Có thể bạn muốn cải thiện kiến thức cơ bản về Hóa học,
             chuẩn bị cho kỳ thi quan trọng, hoặc thậm chí là nghiên cứu sâu hơn về một lĩnh vực cụ thể của Hóa học.</p>
          <WrapperButtonHover textButton={'Xem thêm'} type={'default'} onClick={() => navigate('/LearningPaths/Hoa')}
                        styleButton={{
                            fontSize: '1.6rem',
                            marginTop: '16px',
                            minWidth: '180px',
                            backgroundColor: '#f05123',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '16px',
                            height: '36px',
                            fontWeight: '600',
                        }}
                    />
        </Wrapper>
        <Wrapper >
          <h2>Lộ trình học Lý</h2>
          <p>Để xây dựng một lộ trình học môn Lý hiệu quả, bạn cần bắt đầu bằng việc xác định rõ mục tiêu học của mình. 
            Điều này có thể là cải thiện kiến thức cơ bản về Lý, chuẩn bị cho kỳ thi quan trọng, hoặc nghiên cứu sâu hơn về một lĩnh vực cụ thể trong Lý.</p>
          <WrapperButtonHover textButton={'Xem thêm'} type={'default'} onClick={() => navigate('/LearningPaths/Ly')}
                        styleButton={{
                            fontSize: '1.6rem',
                            marginTop: '16px',
                            minWidth: '180px',
                            backgroundColor: '#f05123',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '16px',
                            height: '36px',
                            fontWeight: '600',
                        }}
                    />
        </Wrapper>
        <Wrapper >
          <h2>Lộ trình học Anh</h2>
          <p>Để xây dựng một lộ trình học môn Tiếng Anh hiệu quả, trước hết, hãy xác định rõ mục tiêu học của bạn. 
            Điều này có thể là cải thiện kỹ năng nghe nói, viết hay đọc, hoặc chuẩn bị cho kỳ thi quan trọng như IELTS hoặc TOEFL.</p>
          <WrapperButtonHover textButton={'Xem thêm'} type={'default'} onClick={() => navigate('/LearningPaths/Anh')}
                        styleButton={{
                            fontSize: '1.6rem',
                            marginTop: '16px',
                            minWidth: '180px',
                            backgroundColor: '#f05123',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '16px',
                            height: '36px',
                            fontWeight: '600',
                        }}
                    />
        </Wrapper>
        </WrapperContainers>
    </WrapperContainer>
  );
};

export default LearningPathsPage;