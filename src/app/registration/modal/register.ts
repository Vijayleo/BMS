export class User
{
    constructor(
    private fullname : String,
    private username : String,
	private password : String,
	private guardianType : String,
	private guardianName : String ,
	private address : String ,
	private citizenship : String,
	private state:String ,
	private country:String ,
	private emailAddress:String ,
	private gender:String ,
	private maritalStatus:String ,
	private contactNo:number,
	private dob :Date ,
	private registrationDate:Date ,
	private  accountType:String,
	private branchName:String ,
	private citizenStatus:String ,
    private amount : number,
    private idProofType:String ,
	private idDocNo: String ,
	private acHolderName :String ,
	private acHolderAccNo :String ,
	private acHolderAddr: String 
	){}
}