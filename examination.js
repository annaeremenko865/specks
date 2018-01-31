'use script';
                  
let we = 0;                    
let read;
read = require('readline-sync');
let Table = require('easy-table');

let question_list = [       

    {
        question: 'What programming language do you learn in the courses?',
        answers: [
            'Java', 'JavaScript', 'C++'
        ],
        correct: [2],
        weight: 3
    },
    {
        question: 'What days do you have courses for?',
        answers: [
            'Monday', 'Wednesday', 'Friday'
        ],
        correct: [2, 3],
        weight: 4
    },
    {
        question: 'From what month does the course take place?',
        answers: [
            'November', 'December', 'February'
        ],
        correct: [1, 3],
        weight: 4
    },
    {
        question: 'How many people are in your group?',
        answers: [
            '13', '21', '25'
        ],
        correct: [1],
        weight: 3
    }

];
let w = Array(question_list.length);            
let attempts = Array(question_list.length);     
let skip = Array(question_list.length);         
for(let i = 0; i < question_list.length; i++) {
    w[i] = 0;
    attempts[i] = 0;
    we = we + question_list[i].weight;
};

function Exam(list) {
let j;
let n = 1;                     
let iq = 0;                    
let k = 0;                     
let is = 0;     
let finish = false;            
let first_pass = true;         
let outputs = []; 
     this.start = function() {             
                 if (finish === true) {       
                   return;                 
                 };
                 iq = n - 1;
                 console.log('('+ n + '/' + question_list.length + ') ' + list[iq].question);  
                 for(let i = 0; i < 3; i++) {
                   j = i + 1;
                   console.log(j + ') ' + list[iq].answers[i]);
                 };
                 console.log('s) <Skip>');
                 console.log('f) <Finish>');
                 outputs[iq] = read.question('');  
                this.check_answers();       
                 if (first_pass) {              
                   if (iq === (question_list.length - 1)) {              
                      if (k > 0) {   
                       first_pass = false;         
                       is = 0;
                        n = skip[is];
                        this.start();
                       };
                     return;                
                   };    
                   if (iq < (question_list.length - 1)) {
                     is++;
                     n++;
                     this.start();
                   };
                 };                          
                 if (!first_pass) {           
                   if (is < (k - 1)) {
                     is++;
                     if (skip[is] !== undefined) {         
                       n = skip[is];
                       this.start();
                     };
                   };
                   if ( is < k + 1){
                    is = 0;
                     while (skip[is] === undefined) {
                     is++;
                     if (is > k) {
                       return;
                     };
                     };            
                    n = skip[is];
                    this.start();
                   }
                   if (k === 0) {
                     return;
                   };
                 };        
     };                                   
          this.check_answers = function() {   
          correct = list[iq].correct.join(',');
                 if (outputs[iq] ==='f') {
                   finish = true;
                   return;
                 }; 
                 if (outputs[iq] === 's') {
                   attempts[iq]++;              
                   if (first_pass) {             
                     skip[k] = iq + 1;   
                     if (k < question_list.length) {
                       k++;
                     };
                   };
                   return;                      
                 };                             
                if (outputs[iq].search(/\d\,\s\d/) === 0){
          outputs[iq] = outputs[iq].replace(/\,\s/, ',')
        }else {if (outputs[iq].search(/\d\s\d/) === 0){
            outputs[iq] = outputs[iq].replace(/\s/, ',')
               }
        }
                 if(outputs[iq] === correct) {
                   w[iq] = list[iq].weight;
                 };
                   attempts[iq]++;             
                   if (!first_pass) {
                     delete skip[is];     
                              if (is === (k - 1)) {
                                k = k - 1;
                              };
                            return;
                   };
                 return;
      }; 
 this.format_as_table = function(){
  let sum = 0;                  
  let rate = 0;   
  let ca = 0; 
  let t = new Table;
    for (iq = 0; iq <= (question_list.length - 1); iq++){
      if (list[iq].question.length > 34){
      list[iq].question = list[iq].question.slice(0, 31) + '...?';  
      }
  let data = [
          { q: (iq + 1) + ') ' + list[iq].question, a:  '  ' + outputs[iq] , cA: '     ' + list[iq].correct, w: '  ' + w[iq], at: '   ' + attempts[iq]},
        ]
      data.forEach(function(test) {
        t.cell('              Question', test.q)
      t.cell('Answer', test.a)
      t.cell('Correct answer', test.cA)
        t.cell('Weight',test.w)
        t.cell('Attempts',test.at)
        t.newRow()
       })
    }
console.log(t.toString());

for(let i = 0; i < question_list.length; i++) {
    sum = sum + w[i];             
    if (w[i] > 0) {
      ca++;                     
    };
};
rate = Math.floor(sum / we * 100);
console.log('\n');
console.log('Correct answers: ' + ca);
console.log('Sum: ' + sum);
console.log('Rate: ' + rate + ' %');
}
};  

let exam = new Exam(question_list);
exam.start();
let output = exam.format_as_table();