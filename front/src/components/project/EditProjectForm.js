import { useState } from 'react';

import InputForm from './InputForm';

import * as API from '../../api';


const EditProjectForm = ({ index, projects, setProjects, setEditToggle }) => {
    //여기서 state 선언하고 하위 input form에서 수정하도록 
    const [project, setProject] = useState(
        {
            id: projects[index].id,
            title: projects[index].title,
            description: projects[index].description,
            start: new Date(),
            end: new Date(),

            skill: projects[index].skill,
            link: projects[index].link,
            imagePaths: projects[index].imagePaths,
        }
    );

    const editProject = async (e) => {
        e.preventDefault();
        //서버요청
        const res = await API.put(`projects/${project.id}`, {
            title: project.title,
            description: project.description,
            from_date: project.start,
            to_date: project.end,
            //아래는 백엔드 필드 구현 예정
            skill: project.skill,
            link: project.link,
            imagePaths: project.imagePaths, //배열 값
        })

        //정상 응답이면 리듀서로 상태관리
        if (res) {
            const tempProjects = [...projects]
            tempProjects[index] = { ...res.data };

            setProjects(tempProjects);
            setEditToggle(false)
        }
    }

    return (
        <div style={{ textAlign: 'start' }}>
            <div className="dropdown-divider"></div>
            <h4 className='mt-3 mb-4'>프로젝트 수정</h4>
            <InputForm
                project={project}
                setProject={setProject}
                submitHandler={editProject}
                setVisibleToggle={setEditToggle}
            />
        </div>
    );
}

export default EditProjectForm;