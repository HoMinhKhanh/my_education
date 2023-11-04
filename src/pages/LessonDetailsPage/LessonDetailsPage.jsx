import React, { useState } from 'react';
import { WrapperLessonsDetailDescription, WrapperLessonsDetailDescriptionP, WrapperLessonsDetailDiv, WrapperLessonsDetailHeader, WrapperLessonsDetailLeft, WrapperLessonsDetailName, WrapperLessonsDetailRight, WrapperLessonsDetailVideo } from './style';
import { Col } from 'antd';
import { useParams } from 'react-router-dom';
import * as LessonService from '../../services/LessonService';
import { useQuery } from '@tanstack/react-query';
import { PlusOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';

const LessonDetailsPage = () => {
    const { id } = useParams()
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
    const [stateLessonDetails, setstateLessonDetails] = useState({
        name: '', 
        description: '', 
        videoId: '', 
        courseId: '', 
        rating: '',
    });

    const fetchCountLesson = async (context) => {
        const id = context?.queryKey && context?.queryKey[1]
        if (id) {
            const res = await LessonService.countAllLesson(id)
            return res
        }
    }

    const { isLoadingLesson, data: lessons } = useQuery(['count-lessons', id], fetchCountLesson, { enabled: !!id })

    function getItem(label, key, icon, children, type, disabled = false) {
        return {
          key,
          icon,
          children,
          label,
          type,
          disabled,
        };
    }
    const items = [
        getItem(
            'Bài học', 
            'sub1', 
            <PlusOutlined />, 
            lessons?.data?.map(
                lesson => getItem(
                    lesson?.name, 
                    lesson?._id, 
                    lesson?.lock ? <CloseCircleOutlined style={{color: 'red'}} /> : <CheckCircleOutlined style={{color: 'green'}} />, 
                    null, 
                    'item', 
                    lesson?.lock)
            )
        )
    ];
    
    // submenu keys of first level
    const rootSubmenuKeys = ['sub1'];

    const [openKeys, setOpenKeys] = useState(['sub1']);

    const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        setOpenKeys(keys);
    } else {
        setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
    };

    const fetchGetDetailsLesson = async (id) => {
        const res = await LessonService.getDetailsLesson(id)
        if (res?.data){
            setstateLessonDetails({
                name: res?.data?.name,
                description: res?.data?.description, 
                videoId: res?.data?.videoId, 
                courseId: res?.data?.courseId, 
                rating: res?.data?.rating,
            })
            setIsLoadingUpdate(false)
        }
    }

    const handleLessonClick = (key) => {
        setIsLoadingUpdate(true)
        fetchGetDetailsLesson(key?.key)
    }

    return (
        <WrapperLessonsDetailDiv>
            <Col span={18}>
                <LoadingComponent isLoading={isLoadingUpdate}>
                    <WrapperLessonsDetailLeft>
                        <WrapperLessonsDetailVideo>
                            <iframe 
                                style={{ border: 'none' }}
                                width="100%" 
                                height="100%" 
                                src={`https://www.youtube.com/embed/${stateLessonDetails?.videoId}`} 
                                title={stateLessonDetails?.name} 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            ></iframe>
                        </WrapperLessonsDetailVideo>
                        <WrapperLessonsDetailDescription>
                            <WrapperLessonsDetailName>{stateLessonDetails?.name}</WrapperLessonsDetailName>
                            <WrapperLessonsDetailDescriptionP>
                                <p>{stateLessonDetails?.description}</p>
                            </WrapperLessonsDetailDescriptionP>
                        </WrapperLessonsDetailDescription>
                    </WrapperLessonsDetailLeft>
                </LoadingComponent>
            </Col>
            <Col span={6}>
                <WrapperLessonsDetailRight>
                    <WrapperLessonsDetailHeader>Nội dung khóa học</WrapperLessonsDetailHeader>
                </WrapperLessonsDetailRight>
                <div>
                    <Menu
                        mode="inline"
                        openKeys={openKeys}
                        onOpenChange={onOpenChange}
                        onClick={handleLessonClick}
                        style={{
                            width: '100%',
                            backgroundColor: 'rgb(245, 245, 245)',
                            border: '1px solid rgb(235, 235, 235)',
                            borderRadius: '6px',
                            color: '#333',
                            fontSize: '1.6rem',
                            fontWeight: '600',
                        }}
                        items={items}
                    />
                </div>
            </Col>
        </WrapperLessonsDetailDiv>
    )
}

export default LessonDetailsPage