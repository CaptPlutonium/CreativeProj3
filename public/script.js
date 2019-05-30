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
            this.words=response.data.value;
            this.valueTypes = response.data.blanks;
            this.length = response.data.blanks.length;
            this.iterator = 0;
            this.currentType = this.valueTypes[0];
            this.string += this.words[0];

        }catch(error){
            console.log(error);
        }

    },
    addResponse() {
        if(this.length == 1)
        {
            this.string += this.inputResponse;
            this.notfinished=false;
            return;
        }
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