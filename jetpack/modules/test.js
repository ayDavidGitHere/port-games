class Class{
    static Method1 = function (){
        this.object1 = "log object1"
    }
}
Class["Method1"].prototype.objectProt = {n: "log objectProt"};

M1 = new Class.Method1();
M1.objectProt = {e: "logEdited objectProt"};


console.log( M1.objectProt );
console.log( new Class.Method1().objectProt )