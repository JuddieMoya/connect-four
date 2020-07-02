https://amandalynnes.gitlab.io/connect-four-assessment


We recieved help from the following people: Amanda Yonce,

We built off of Randy's started code from demo.

Group members: Judith Moya, Reginald Jefferson, Jalon Dodson, and Amanda Simmons


Connect Four Development Plan


1. two-player game with red and black pieces
    1) one player moves one piece at a time
        a)display/create red and black discs, 6rows, and 7columns using divs
    
    
2. place pieces on top of one another

    1)stack pieces from bottom to top
        a)make the game board flex and each column
        b)add clickhandlers to each column, use appendchild to add selected disc there
        c)attach clickhandlers to black and red piece dispayed next to the board
        d)console.log whichever disc was chosen
        e)toggle the color for the next player

    2)check to see if certain moves are possible or if column is full
        a)if/ else statement checking for blank space to move piece, else put the piece on top
        b)if/else statement check if column is full
        

3. stack pieces until a player gets four pieces connecting in a row(horizontally, vertically,diagonally), or they fill all of the columns (called a tie)     

    1)set up if/ else statements for red win/black win or tie conditions
