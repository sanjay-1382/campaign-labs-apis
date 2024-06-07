
export const getAllCountries=(req,res)=>{
    res.json({
      allCountries:[
        {
            countryName:"IND",
            countryId:1
        }
      ]
    })
}