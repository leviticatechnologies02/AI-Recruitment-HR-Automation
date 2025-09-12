import React from 'react'
import { Icon } from "@iconify/react";
import allUserData from "../../data.json";
const AdminCounters = () => {
    const countersArray = Object.entries(allUserData.allUserData);
    return (
        <div className='row row-cols-xxxl-5 row-cols-lg-3 row-cols-sm-2 row-cols-1 gy-4'>
            {countersArray.map(([key, data], index) => (
                <div className="col" key={index}>
                    <div className={`card shadow-none border ${data.bgr} h-100`}>
                        <div className="card-body p-20">
                            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                                <div>
                                    <p className="fw-medium text-primary-light mb-1">{key}</p>
                                    <h6 className="mb-0">{data.value.toLocaleString()}</h6>
                                </div>
                                <div className={`w-50-px h-50-px ${data.BgI} rounded-circle d-flex justify-content-center align-items-center`}>
                                    <Icon
                                        icon={data.icon}
                                        className="text-white text-2xl mb-0"
                                    />
                                </div>
                            </div>
                            <p className="fw-medium text-sm text-primary-light mt-12 mb-0 d-flex align-items-center gap-2">
                                <span
                                    className={`d-inline-flex align-items-center gap-1 ${data.change >= 0 ? "text-success-main" : "text-danger"
                                        }`}
                                >
                                    <Icon
                                        icon={data.change >= 0 ? "bxs:up-arrow" : "bxs:down-arrow"}
                                        className="text-xs"
                                    />
                                    {data.change}
                                </span>
                                {data.period}
                            </p>
                        </div>
                    </div>
                </div>
            ))}

        </div>
    )
}

export default AdminCounters