import { Await, defer, useLoaderData } from "react-router-dom"
import {httpInterceptedService} from '@core/http-service'
import CategoryList from "../features/categories/components/category-list"
import { Suspense, useState } from "react"
import Modal from "../components/modal";

 
const CourseCategories = ()=>{
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const data = useLoaderData()

    const handleDeleteCategory = async () => {
        setShowDeleteModal(false);
        console.log('Delete Done')
        // const response = httpInterceptedService.delete(
        //     `/CourseCategory/${selectedCategory}`
        // );

    }
    return(
        <>
            <div className="row">
                <div className="col-12">
                    <div className="d-flex align-items-center justify-content-between mb-5">
                        <a className="btn btn-primary fw-bolder mt-n1">
                            افزودن دسته جدید
                        </a>
                    </div>
                </div>
                <Suspense
                    fallback={<p className="text-info">در حال دریافت اطلاعات ...</p>}
                >
                    <Await resolve={data.categories}>
                        {
                            (loadedCategories) => <CategoryList setShowDeleteModal={setShowDeleteModal} categories={loadedCategories}/>
                        }
                    </Await>
                </Suspense>
            </div>
            <Modal
                isOpen={showDeleteModal}
                open={setShowDeleteModal}
                title="حذف"
                body="آیا از حذف این دسته اطمینان دارید؟"
            >
                <button
                    type="button"
                    className="btn btn-secondary fw-bolder"
                    onClick={() => setShowDeleteModal(false)}
                >
                    انصراف
                </button>
                <button
                    type="button"
                    className="btn btn-primary fw-bolder"
                    onClick={handleDeleteCategory}
                >
                    حذف
                </button>
            </Modal>
        </>
    )
}


export async function categoriesLoader ({request}) {
    return defer ({
        categories: loadCategories(request)
    })
}

const loadCategories = async (request)=> {
    const page = new URL(request.url).searchParams.get('page') || 1
    const pageSize = import.meta.env.VITE_PAGE_SIZE
    // const pageSize = 5
    let url = '/CourseCategory/sieve'

    url += `?page=${page}&pageSize=${pageSize}`
    const response = await httpInterceptedService.get(url)
    return response.data
}

export default CourseCategories