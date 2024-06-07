
export const getAllPaymentTypes=(req,res)=>{
    res.json({
      allPaymentTypes:["CPA","CPC","CPI","CPL","CPM","CPS","REVSHARE"]
    })
}