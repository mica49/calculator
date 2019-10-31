function button_clicked(x){ 
    document.getElementById("memory").innerHTML += x
}

function setCharAt(str, index, chr, prev_delete, next_delete) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index + (prev_delete-1) + next_delete);//Allow to jump of all the characters that disappear from the original string
}

// equal_clicked with function  eval()

/*function equal_clicked(){ 
    try{ 
    document.getElementById("memory").innerHTML += "<br>= "+eval(document.getElementById("memory").innerHTML)
    } catch(exception){
        document.getElementById("memory").innerHTML = "ERROR SYNTAXE"
    }
}*/

function equal_clicked(){
    let num_tab = [], numz = document.getElementById("memory").innerHTML, tot = 0,temp = "", op = "", previous_op=2, next_op=2;

    for(let i = 0; i<numz.length; i++){
        if(numz[i] == '*' || numz[i] == '/'){

            while(!isNaN(numz[i-previous_op]) || numz[i-previous_op] == '.'){
                previous_op++
            }
            while(!isNaN(numz[i+next_op]) || numz[i+next_op] == '.'){
                next_op++
            }

            if(numz[i] == '*'){
            numz = setCharAt(numz, i-previous_op+1, parseFloat(numz.substring(i-previous_op+1, i)*(numz.substring(i+1, i+next_op))), previous_op, next_op)
            } else{
                numz = setCharAt(numz, i-previous_op+1, parseFloat(numz.substring(i-previous_op+1, i)/(numz.substring(i+1, i+next_op))), previous_op, next_op)
        }
        while(previous_op>1){
            num_tab.pop()
            previous_op--
            i--
        }
    }
        num_tab.push(numz[i])
}

    for(i=0; i<=num_tab.length; i++){
        if(!isNaN(num_tab[i]) || num_tab[i] == '.'){
            temp += num_tab[i]
        } else {
            if(tot == 0 /*&& op != '*'*/){// No need to include the multiplication option
                tot = parseFloat(temp)
            } else{
                switch(op){
                    case "+":
                    tot += parseFloat(temp)
                    break
                case "-":
                    tot -= parseFloat(temp)
                    break

                //multiplication and division have been took care in the previous "for"

                /*case "*": 
                    tot *= parseFloat(temp)
                    break
                case "/":
                    tot /= parseFloat(temp)
                    break*/
                }
            }
            temp = ""
            op = num_tab[i]
        }
    }

    document.getElementById("memory").innerHTML += "<br>= "+tot;
}

function sign_clicked(){
    let num = document.getElementById("memory").innerHTML
    if(typeof parseFloat(num) == "number"){
        document.getElementById("memory").innerHTML = parseFloat(num)*-1
    } 
}

function reset_clicked(){
    let num = document.getElementById("memory").innerHTML
    for(i = 0; i<num.length; i++){
        if(num[i] == '='){
            document.getElementById("footer").innerHTML +="<br> "+document.getElementById("memory").innerHTML 
        }
    }
    document.getElementById("memory").innerHTML = ""
}

function power_clicked(){
    document.getElementById("memory").innerHTML *= document.getElementById("memory").innerHTML
}

function inverse_clicked(){
    document.getElementById("memory").innerHTML = 1/document.getElementById("memory").innerHTML
}