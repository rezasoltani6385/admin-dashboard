import { httpInterceptedService } from "@core/http-service"
import CourseList from "../features/courses/components/course-list"
import { Await, defer, useLoaderData } from "react-router-dom"
import { Suspense } from "react"

const Courses = ()=> {
    const data = useLoaderData()
    return (
        <div className="row">
            <div className="col-12">
                <div className="d-flex align-items-center justify-content-between mb-5">
                    <a className="btn btn-primary fw-bolder mt-n1">
                        افزودن دوره جدید
                    </a>
                </div>
            </div>
            <Suspense
                fallback={<p className="text-info">در حال دریافت اطلاعات ...</p>}
            >
                <Await resolve={data.courses}>
                    {
                        (loadCourses) => <CourseList courses={loadCourses}/>
                    }
                </Await>
            </Suspense>
        </div>
    )
}


export async function courseLoader (){
    return defer ({
        courses: loadCourses(),
    })
}

const loadCourses = async ()=>{
    const response = await httpInterceptedService.get('/Course/list')
    return response.data
}

export default Courses