import { UsersService } from "../services/api/auth/users.service";
export class User {
  username="";
  password="";
  confirmPassword="";
  name="";
  lastname="";
  role="";
  mobileNumbers="";
  utype='add';
  devices=[];
  constructor(private uService: UsersService){

  }

  empty(){
    this.utype="add"
    this.username = "";
    this.password="";
    this.confirmPassword="";
    this.name="";
    this.lastname="";
    this.role="user";
    this.mobileNumbers="";
    this.devices=[];
  }

  validate(){
    
    let ret = {
      success: true,
      errors:<{
        username: string,
        name: string,
        lastname: string,
        password: string,
        confirmPassword: string,
      }>{}
    }
    if(this.username == ""){
      ret.success = false;
      ret.errors.username = "Il campo username è obbligatorio";
    }

    if(this.name == ""){
      ret.success = false;
      ret.errors.name = "Il campo nome è obbligatorio";
    }
    if(this.lastname == ""){
      ret.success = false;
      ret.errors.lastname = "Il campo cognome è obbligatorio";
    }

    if(this.password != this.confirmPassword){
      ret.success = false;
      ret.errors.password = "I campi password e conferma password devono coincidere";
      ret.errors.confirmPassword = "I campi password e conferma password devono coincidere";
    }
    if(this.utype == "add" && this.password == ""){
      ret.success = false;
      ret.errors.password = "Il campo password è obbligatorio";
    }
    return ret;
    
  }
  
  createByUsername(username,callback){
    this.uService.item(username,"username",(data)=>{
      this.username = data.user.username;
      this.name = data.user.name;
      this.lastname = data.user.lastName;
      this.role = data.user.role;
      this.mobileNumbers = data.user.mobileNumbers;
      this.devices = data.user.devices;
      this.password = "";
      this.utype="edit";
      callback();
    })
  }

  save(callback){
    const data = {
      username: this.username,
      password: this.password,
      name: this.name,
      lastName: this.lastname,
      role: this.role,
      mobileNumbers: this.mobileNumbers,
      devices:this.role=='user'?this.devices:null,
      
    }
    if(this.utype == "add" ){
      this.uService.add(data,(dt)=>{
        if(!dt.success ){
          dt.errors = {
            username: dt.errorTxt?dt.errorTxt:"Errore sconosciuto",
          }
        }
        callback(dt,"add");
      });
    }else{
      this.uService.update(data,(dt)=>{
        if(!dt.success ){
          dt.errors = {
            username: dt.errorTxt?dt.errorTxt:"Errore sconosciuto",
          }
        }
        callback(dt,"edit");
      });
    }
  }
}
