import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

declare var ace: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements AfterViewInit{

  @ViewChild('editor') private editor!:ElementRef;
  output: string = '';
  code: string = `
    Contract ExampleContract accepts 0x123456789abcdef, 0xabcdef123456789:
    State:
    int stateVariable1;
    int stateVariable2;

    initState(int initialValue1, int initialValue2):
    stateVariable1 = initialValue1;
    stateVariable2 = initialValue2;

    calculateSum(int a, int b) public:
    // This function takes two integers and returns their sum.
    return a + b;`;

  constructor() {}

  ngAfterViewInit(): void {
    const aceEditor = ace.edit(this.editor.nativeElement);
    aceEditor.setTheme('ace/theme/twilight');
    aceEditor.session.setMode('ace/mode/plaintext');
    aceEditor.setOptions({
      fontSize: "14px",
      showLineNumbers: true,
      showGutter: true,
    });
    aceEditor.resize();
  }
  runCode(): void {
    const aceEditor = ace.edit(this.editor.nativeElement);
    const solidityCode = aceEditor.getValue();

    const input = {
      language: 'Solidity',
      sources: {
        'TestContract.sol': {
          content: solidityCode
        }
      },
      settings: {
        outputSelection: {
          '*': {
            '*': ['*']
          }
        }
      }
    };
  }
}
