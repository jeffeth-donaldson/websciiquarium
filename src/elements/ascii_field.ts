// Utility class for ASCII art manipulation


export class AsciiField {
    width: number;
    height: number;
    field: string[];
    
    constructor(width: number, height: number, fillChar: string = ' ') {
        this.width = width;
        this.height = height;
        this.field = [];

        this.fillArea();
    }
    
    fillArea(char: string = ' '): void {
        // Creates a rectangular area filled with the specified character
        this.field = Array(this.height).fill(char.repeat(this.width));
    }

    setHeight(height: number): void {
        this.height = height;
        this.fillArea();
    }

    setWidth(width: number): void {
        this.width = width;
        this.fillArea();
    }

    resize(width: number, height: number): void {
        this.width = width;
        this.height = height;
        this.fillArea();
    }

    drawArt(art: string, x: number, y: number): void {
        // Draws ASCII art onto the field at specified (x, y) coordinates
        // debugger;
        const artLines = art.split('\n');
        for (let i = 0; i < artLines.length; i++) {
            const lineY = y + i;
            if (lineY < 0 || lineY >= this.height) continue; // Skip out-of-bounds lines
            
            const artLine = artLines[i];
            let fieldLine = this.field[lineY];
            let extraSpanChars = 0;
            let extraFieldChars = 0;
            let removedSpan = false;
            let savedStyle = '';
            let cutoffSpanChars = 0; // Number of span chars cut off at the start due to negative x
            for (let j = 0; j < artLine.length; j++) {
                let lineX = x + j + extraFieldChars - cutoffSpanChars;
                let artChar = artLine[j];
                if (lineX < 0 || lineX >= (this.width+extraSpanChars)) {
                    // See if the artChar is the start of a span
                    if (artChar === '<' && artLine.slice(j, j + 5) === '<span') {
                        // Find the end of the span tag
                        const endTagIndex = artLine.indexOf('>', j);
                        if (endTagIndex !== -1) {
                            const spanTag = artLine.slice(j, endTagIndex + 1);
                            // If we cutoff a tag at the start, we need to advance j, but not lineX
                            j += spanTag.length; // Move j to the end of the span tag
                            cutoffSpanChars += spanTag.length; // remember to not jump ahead on lineX
                            continue;
                        }
                    }
    
                    // See if the artChar is the end of a span
                    if (artChar === '<' && artLine.slice(j, j + 7) === '</span>') {
                        const endSpanTag = '</span>';
                       // If we cutoff a tag at the start, we need to advance j, but not lineX
                        j += endSpanTag.length; // Move j to the end of the span tag
                        cutoffSpanChars += endSpanTag.length; // remember to not jump ahead on lineX
                        continue;
                    }

                    continue; // Skip out-of-bounds characters  
                } 

                // TODO: fix this, not working right

                // Look for <span> tags in field
                if (fieldLine[lineX] === '<' && fieldLine.slice(lineX, lineX + 5) === '<span') {
                    const endTagIndex = fieldLine.indexOf('>', lineX);
                    if (endTagIndex !== -1) {
                        savedStyle = fieldLine.slice(lineX, endTagIndex + 1);
                        // Delete the tag from the line
                        this.field[lineY] = fieldLine.slice(0, lineX) + fieldLine.slice(lineX + savedStyle.length);
                        fieldLine = this.field[lineY];
                        removedSpan = true;
                    }
                }
                // Look for closing </span> tags in field
                if (fieldLine[lineX] === '<' && fieldLine.slice(lineX, lineX + 7) === '</span>') {
                    // We found a closing tag, this can mean one of the following things:
                    // 1. if savedStyle is set, and removedSpan is true, that means we completely overwrote a span's contents
                    //    so we can just remove the closing tag
                    // 2. if savedStyle is set, and removedSpan is false, that means we are ending a span that we started
                    //    so we need to keep the closing tag and clear savedStyle
                    // 3. if savedStyle is not set, something went wrong and we need to log a warning. We will remove the closing tag
                    if (savedStyle === '') {
                        console.warn("Found closing </span> tag without matching opening <span> tag");
                    }
                    if (removedSpan || savedStyle === '') {
                        // Case 1: completely overwrote a span's contents, just remove the closing tag
                        this.field[lineY] = fieldLine.slice(0, lineX) + fieldLine.slice(lineX + 7);
                        fieldLine = this.field[lineY];
                        removedSpan = false;
                    } else {
                        // Case 2: We'll just skip over the tag
                        extraFieldChars += 7;
                        extraSpanChars += 7;
                        continue;
                    }
                    savedStyle = '';
                }

                if (artChar === ' ') {
                    if (savedStyle && removedSpan ) {
                        // oops, we aren't drawing anything let's put the style back
                        this.field[lineY] = fieldLine.slice(0, lineX) + savedStyle + fieldLine.slice(lineX);
                        fieldLine = this.field[lineY];
                        extraSpanChars += savedStyle.length;
                        extraFieldChars += savedStyle.length;
                        removedSpan = false;
                    }
                    continue; // Skip spaces in art
                } else if (savedStyle && !removedSpan) {
                    // We skipped over an existing opening tag due to spaces, we need to put a closing tag before our stuff
                    const endSpanTag = '</span>';
                    this.field[lineY] = fieldLine.slice(0, lineX) + endSpanTag + fieldLine.slice(lineX);
                    fieldLine = this.field[lineY];
                    extraSpanChars += endSpanTag.length;
                    extraFieldChars += endSpanTag.length;
                    removedSpan = true;
                    lineX += endSpanTag.length; // Adjust lineX to account for the inserted closing tag
                }


                // See if the artChar is the start of a span
                if (artChar === '<' && artLine.slice(j, j + 5) === '<span') {
                    // Find the end of the span tag
                    const endTagIndex = artLine.indexOf('>', j);
                    if (endTagIndex !== -1) {
                        const spanTag = artLine.slice(j, endTagIndex + 1);
                        // Insert the span tag into the field line
                        this.field[lineY] = fieldLine.slice(0, lineX) + spanTag + fieldLine.slice(lineX);
                        fieldLine = this.field[lineY];
                        j += spanTag.length; // Move j to the end of the span tag
                        extraSpanChars += spanTag.length;
                        continue;
                    }
                }

                // See if the artChar is the end of a span
                if (artChar === '<' && artLine.slice(j, j + 7) === '</span>') {
                    const endSpanTag = '</span>';
                    // Insert the end span tag into the field line
                    this.field[lineY] = fieldLine.slice(0, lineX) + endSpanTag + fieldLine.slice(lineX);
                    fieldLine = this.field[lineY];
                    j += endSpanTag.length - 1; // Move j to the end of the end span tag
                    extraSpanChars += endSpanTag.length;
                    continue;
                }

                // Regular character, just draw it
                if (artChar === 'x') {
                    // x is a special character for overwriting with space
                    // plain old space means "don't overwrite"
                    artChar = ' ';
                }
                this.field[lineY] = fieldLine.slice(0, lineX) + artChar + fieldLine.slice(lineX + 1);

                console.log(this.field);
            }
        }
    }

    getContent(): string {
        return this.field.join('\n');
    }

}

