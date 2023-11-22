import React from 'react';
import { Wrapper, WrapperContainer } from './style';
import * as CourseService from '../../services/CourseService';
import { useQuery } from '@tanstack/react-query';

const LearningPathsPage  = () => {

    const type = 'Vật lý'

    const fetchGetAllCourseType = async (context) => {
        const type = context?.queryKey && context?.queryKey[1]
        if (type) {
            const res = await CourseService.getAllCourseType(type)
            return res
        }
    }

    const { isLoadingCourse, data: courses } = useQuery(['courses', type], fetchGetAllCourseType, { enabled: !!type })

    return (
        <WrapperContainer>
            <div>
                <h1>Lộ trình học Lý</h1>
            </div>
            <div>
                <p>Lộ trình học Lý, hay vật lý, cũng phụ thuộc vào mục tiêu cụ thể và cấp độ học vấn của bạn. Dưới đây là một lộ trình tổng quan</p>
            </div>
            <Wrapper>
                <h2>
                    1. Tiểu học và Trung học cơ sở
                </h2>
                <p>+ Nắm vững các kiến thức cơ bản về vật lý như lực, năng lượng, và chuyển động. <br />
                   + Tham gia vào các thí nghiệm cơ bản để hiểu rõ các nguyên tắc cơ bản của vật lý. <br />
                   + Học cơ bản về các đơn vị đo lường và sử dụng chúng trong bài toán vật lý đơn giản.
                   </p>
                   <h2>
                    2. Trung học phổ thông
                </h2>
                <p>+ Nắm vững kiến thức về cơ học, nhiệt động học, điện từ và dao động. <br />
                   + Hiểu về các định luật của Newton và áp dụng chúng vào các vấn đề thực tế.<br />
                   + Học về nhiệt động học và động học vật lý. <br />
                   + Tham gia vào các hoạt động nghiên cứu và thực hành thí nghiệm.
                   </p>
                   <h2>
                    3. Chuẩn bị cho Đại học
                </h2>
                <p>+ Nắm vững kiến thức cơ bản về vật lý hiện đại và cơ học lượng tử. <br />
                   + Tham gia vào các khóa học hay các chương trình học mùa hè liên quan đến vật lý. <br />
                   + Phát triển kỹ năng giải quyết vấn đề và suy luận logic.
                   </p>
                   <h2>
                    4. Đại học
                </h2>
                <p>+ Chọn ngành vật lý hoặc các chuyên ngành chuyên sâu như vật lý hạt nhân, vật lý lượng tử, v.v. <br />
                   + Tham gia vào các dự án nghiên cứu trong phòng thí nghiệm. <br />
                   + Học các kỹ thuật và phương pháp nghiên cứu vật lý hiện đại.<br />
                   + Xây dựng kỹ năng viết và báo cáo nghiên cứu.
                   </p>
                   <h2>
                    5. Nghiên cứu và Ứng dụng
                </h2>
                <p>+ Nghiên cứu trong lĩnh vực chuyên sâu của vật lý. <br />
                   + Áp dụng kiến thức vào các vấn đề thực tế như phát triển công nghệ mới và nghiên cứu cơ bản. 
                   </p>
                   <h2>
                    6. Liên tục Học hỏi
                </h2>
                <p>+ Liên tục theo dõi các tiến bộ mới trong lĩnh vực vật lý.<br />
                   + Tham gia vào cộng đồng vật lý, tham gia hội nghị và cuộc họp ngành nghề.<br />
                   + Nâng cao kỹ năng thông tin và kỹ năng mềm liên quan đến nghề nghiệp.
                   </p>
                   <h3>
                    Dưới đây là một số khóa học Lý tốt:
                   </h3>
            </Wrapper>
            <div style={{ display: 'flex', gap: '12px' }}>
                { 
                    courses?.data?.map(
                        course => {
                            return (
                                <div
                                    style={{
                                        width: '30%',
                                    }} 
                                >
                                    <a href={`http://localhost:3000/product-details/${course?._id}`}>
                                        <img 
                                            src={course?.image} 
                                            alt={course?.name}
                                            title={course?.name}
                                            style={{
                                                width: '100%',
                                            }} 
                                        />
                                    </a>
                                </div>
                            )
                        }
                    ) 
                }
                </div>
        </WrapperContainer>
    );
 };
  export default LearningPathsPage;