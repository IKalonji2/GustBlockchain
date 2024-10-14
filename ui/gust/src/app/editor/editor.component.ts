import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

declare var ace: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements AfterViewInit{

  @ViewChild('editor') private editor!:ElementRef;
  code: string = `/* Hello Awesome Dev \nInteract with your smart contract code */ \nconsole.log('Hello, World!');`;

  constructor() {}

  ngAfterViewInit(): void {
    const aceEditor = ace.edit(this.editor.nativeElement);
    aceEditor.setTheme('ace/theme/twilight');
    aceEditor.session.setMode('ace/mode/javascript');
    aceEditor.setOptions({
      fontSize: "14px",
      showLineNumbers: true,
      showGutter: true,
    });
    aceEditor.resize();
  }

}
