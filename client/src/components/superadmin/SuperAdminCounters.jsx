
import React from 'react'
import { Icon } from "@iconify/react";

const SuperAdminCounters = () => {
    const adminCountersData = {
        "Total Users": {
            value: 1247,
            icon: "heroicons:users",
            bgr: "border-primary-600",
            BgI: "bg-primary-600",
            change: 12,
            period: "Last 30 days"
        },
        "Active Jobs": {
            value: 89,
            icon: "heroicons:briefcase",
            bgr: "border-success-600",
            BgI: "bg-success-600", 
            change: 8,
            period: "This month"
        },
        "Pending Applications": {
            value: 156,
            icon: "heroicons:document-text",
            bgr: "border-warning-600",
            BgI: "bg-warning-600",
            change: -3,
            period: "This week"
        },
        "System Health": {
            value: 99.8,
            icon: "heroicons:cpu-chip",
            bgr: "border-info-600", 
            BgI: "bg-info-600",
            change: 0.2,
            period: "Uptime %"
        },
        "Super Admins": {
            value: 3,
            icon: "heroicons:shield-check",
            bgr: "border-purple-600",
            BgI: "bg-purple-600",
            change: 0,
            period: "Active now"
        }
    };

    const countersArray = Object.entries(adminCountersData);
    
    return (
        <div className='row row-cols-xxxl-5 row-cols-lg-3 row-cols-sm-2 row-cols-1 gy-4'>
            {countersArray.map(([key, data], index) => (
                <div className="col" key={index}>
                    <div className={`card shadow-none border ${data.bgr} h-100`}>
                        <div className="card-body p-20">
                            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                                <div>
                                    <p className="fw-medium text-primary-light mb-1">{key}</p>
                                    <h6 className="mb-0">{typeof data.value === 'number' && data.value > 100 ? data.value.toLocaleString() : data.value}</h6>
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

export default SuperAdminCounters


