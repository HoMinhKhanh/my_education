import React from 'react';
import { Wrapper, WrapperContainer } from './style';
import * as CourseService from '../../services/CourseService';
import { useQuery } from '@tanstack/react-query';

const LearningPathsPage  = () => {
    const type = 'Toán'

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
                <h1>Lộ trình học Toán</h1>
            </div>
            <div>
                <p>Lộ trình học toán có thể phụ thuộc vào mục tiêu cụ thể của bạn và cấp độ học vấn hiện tại. 
                    Dưới đây là một lộ trình tổng quan, nhưng hãy nhớ rằng mọi người có thể có những đường đi riêng biệt dựa trên nhu cầu và mục tiêu cá nhân của họ.</p>
            </div>
            <Wrapper>
                <h2>
                    1. Cơ bản
                </h2>
                <p>+ Học cơ bản về toán học tiểu học và trung học cơ sở. <br />
                   + Hiểu vững kiến thức về số học, hình học và đại số cơ bản.
                   </p>
                   <h2>
                    2. Trung học phổ thông
                </h2>
                <p>+ Nâng cao kiến thức đại số, hình học, giải tích và xác suất. <br />
                   + Học về các chủ đề như hàm số, đạo hàm, tích phân. <br />
                   + Hiểu rõ cơ bản về hình học phổ thông, xác suất và thống kê.
                   </p>
                   <h2>
                    3. Chuẩn bị cho Đại học
                </h2>
                <p>+ Ôn tập kiến thức từ trung học phổ thông và nắm vững các chủ đề quan trọng. <br />
                   + Học thêm về giải tích nâng cao, đại số tuyến tính, xác suất và thống kê. <br />
                   + Nắm vững kỹ năng giải bài toán và áp dụng kiến thức vào thực tế.
                   </p>
                   <h2>
                    4. Đại học
                </h2>
                <p>+ Học sâu về các lĩnh vực cụ thể như giải tích, đại số, xác suất, thống kê, hình học và các lĩnh vực toán ứng dụng. <br />
                   + Tùy thuộc vào sự quan tâm, có thể chọn học sâu vào lĩnh vực như toán ứng dụng, toán học máy, xử lý ảnh, mô phỏng toán học, v.v.</p>
                   <h2>
                    5. Nghiên cứu và Ứng dụng
                </h2>
                <p>+ Nghiên cứu trong các lĩnh vực chuyên sâu của toán học. <br />
                   + Áp dụng kiến thức vào các vấn đề thực tế và các lĩnh vực nghề nghiệp như khoa học dữ liệu, trí tuệ nhân tạo, kỹ thuật tài chính, v.v.</p>
                   <h2>
                    6. Liên tục Học hỏi
                </h2>
                <p>+ Theo dõi các tiến bộ mới trong lĩnh vực toán học. <br />
                   + Tham gia các khóa học trực tuyến, hội thảo và nhóm nghiên cứu để cập nhật kiến thức.
                   </p>
                   <h3>
                    Dưới đây là một số khóa học toán tốt:
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