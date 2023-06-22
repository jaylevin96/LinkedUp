import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Education({ education }) {
    return <div className="profile-section-details">
        <h4>{education.school}</h4>
        <div>
            <span>{education.degree}</span>
        </div>
        <div>
            {education.field}
        </div>
        <div>{`${education.fromDate} - ${education.toDate}`}</div>

    </div>
}
