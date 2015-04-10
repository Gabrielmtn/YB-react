#### Meta Entry - Redirect project goals

Instead of going into the tall grass with React, i.e., trying for task one to
be implementing table animations, we're refactoring this candidate project. I'll instead be hunting for ways to add search and unique UX to the data, first as pre-existing components, and second adding features of my own creation.

I've been studying React at a high level, and referencing the code it's self as I've been learning, so my initial inspecting of the code isn't a component of this log, though stepping through it is.

##Entry 1 - Follow existing breadcrumbs

Read up on https://facebook.github.io/fixed-data-table/, which fixedTable.jsx comments claims it is loosely based upon

I'm already seeing some components (like main.jsx's handleColToggle()) that fixed-data-table doesn't implement.

Notable is that FixedDataTable does not provide a layout reflow mechanism, calculate content layout information such as width and height of the cell contents or handle any sorting of data.

I'm thinking that the "based on fixed-data-table" comment may be less about using the code, and more about concepts.

If I'm going to find components to extend the table, I should be searching for component prototypes / inspiration elsewhere.

##Entry 2 - Step through Main.jsx

It's notable how initially opaque this file was, versus how it feels now with my studies of react. I can now conceptualize much of the functionality, and track the components' heirarchy through the code.

Stepping through with fresh eyes reminds me that this is the first time seeing the import / export used so extensively. Dash quickly tells me that I should be thanking Traceur. Thanks, Traceur!

#### Here are some high level thoughts, though I added a few comments to main.jsx:

Was easy enough to check how lo_dash's SortBy works, and see how changing it to Company or UID would affect things:

    let sorted = sortBy(USER_DATA, 'name');

Initially, this ternary expression within main.jsx threw me, but after studying, it's actually much more efficient:

    let newDirection = (this.state.sortDirection === 'az' && this.state.sortColumn === newColumn) ? 'za' : 'az'

I also studied let vs var, but curious why let works better than var here:

    let App = React.createClass({


##Entry 3 - Implement Data into existing Components research

Research: http://summitroute.github.io/react-structured-filter/demo.html (too hot)

Research: http://glittershark.github.io/reactable/ (too cold)

Research: http://griddlegriddle.github.io/Griddle/ (just right)

##Entry 4 - Day two of serious React studying.

I'm starting to be less interested in the tutorials and more interested in the docs, this may be due to that fact that all tuts seem to cover the same basic stuff, and I'm not learning as much.

I found an excellent .docset file for react, and have enjoyed stepping through it as a see unfamiliar things in various projects.

I think the little projects I do in the react-studies folder give me the most literacy with react, and ability to create, so I'll likely focus on projects like that until I feel familiar enough to create the searchbar from scratch. 

I made some progress on the UX of the table, adding hover states and better visual style. 