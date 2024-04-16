// require('dotenv').config();
// const BASE_URL= process.env.REACT_APP_BASE_URL
const BASE_URL = 'http://localhost:4000/api/v1'

export const categories={
    CATEGORIES_API:BASE_URL + '/course/showAllCategory',
    CATEGORIES_PAGE_DETAILS:BASE_URL + '/course/categoryPageDetails',
    CATEGORY_DETAILS:BASE_URL + '/course/categoryDetails',
    
}

export const courses={
    GET_ALL_COURSES:BASE_URL+'/course/showAllCourses',
    CREATE_COURSE:BASE_URL+'/course/createCourse',
    COURSE_DETAILS:BASE_URL+'/course/getCourseDetails',
    PUBLISH_COURSE:BASE_URL+'/course/publishCourse',
    DELETE_COURSE:BASE_URL+'/course/deleteCourse'
}

export const section={
    CREATE_SECTION:BASE_URL+'/course/createSection',
    DELETE_SECTION:BASE_URL+'/course/deleteSection',
}

export const subsection={
    CREATE_SUBSECTION:BASE_URL+'/course/createSubSection',
    DELETE_SUBSECTION:BASE_URL+'/course/deleteSubSection',

}

export const auth={
    LOGIN_API:BASE_URL + '/auth/login',
    SIGNUP_API:BASE_URL + '/auth/signup',
    SENDOTP_API:BASE_URL + '/auth/sendOTP',
    RESETPASSWORD_TOKEN_API:BASE_URL+'/auth/resetPasswordToken',
    RESET_PASSWORD_API:BASE_URL+'/auth/resetPassword',
    CHANGE_PASSWORD:BASE_URL+'/auth/changePassword',
    
}

export const message={
    SEND_MESSAGE_API:BASE_URL+'/message/sendMessage'
}

export const profile={
   GET_USER_DETAILS_API:BASE_URL+'/profile/userDetails',
   UPDATE_PROFILE_API:BASE_URL+'/profile/updateProfile',
   DELETE_ACCOUNT_API:BASE_URL+'/profile/deleteAccount'
}

export const studentEndpoints={
    COURSE_PAYMENT_API:BASE_URL+'/payment/capturePayment',
    COURSE_VERIFY_API:BASE_URL+'/payment/verifySignature',
    SEND_PAYMENT_SUCCESSFULL_EMAIL_API:BASE_URL+'/payment/sendPaymentSuccessEmail'
}

