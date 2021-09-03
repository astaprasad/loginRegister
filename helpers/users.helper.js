exports.errorResponse = (res,msg,error)=>{
    return res.status(400).json({
        status:true,
        message:msg,
        error:error
    });
};
exports.successResponse = (res,msg,data)=>{
    return res.status(200).json({
        status:true,
        message:msg,
        data:data
    });
};