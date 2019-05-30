new Vue({
    el: '#app',
    data: {
        //responses: [],
        valueTypes: [],
        words: [],
        currentType: '',
        string: '',
        iterator: '',
        length: '',
        notfinished: true,
        inputResponse: '',
        madLibTitle:'',

      
    
    },
    mounted () {
        this.madLibs();
    },
    methods:{
        async madLibs(){
        try{
            const response= await axios.get('https://madlibz.herokuapp.com/api/random');
            this.madLibTitle=response.data.title;
            for(var i =0; i< response.data.value.length -1; i++){
                this.words.push(response.data.value[i]);
            }
            for(var i =0; i< response.data.blanks.length -1; i++){
                this.valueTypes.push(response.data.blanks[i]);
            }
            this.length = response.data.blanks.length;
            this.iterator = 0;
            this.currentType = this.valueTypes[0];
            this.string += this.words[0];

        }catch(error){
            console.log(error);
        }

    },
    addResponse() {
        this.iterator++;
        this.string += this.inputResponse;
        this.string += this.words[this.iterator];
        this.currentType = this.valueTypes[this.iterator];
        this.inputResponse = "";
        
        if(this.iterator >= this.length-1)
        {
            this.notfinished=false;
            this.string += this.words[this.iterator+1];
            return;
        }
            
    },

    }
  });