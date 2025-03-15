import { Node, mergeAttributes } from '@tiptap/core';
import { NodeViewWrapper, NodeViewContent, ReactNodeViewRenderer } from '@tiptap/react';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    Grid: {
      addGrid: () => ReturnType,
      addGridRow: () => ReturnType,
      toggleGrid: () => ReturnType,
      addGridColumn: () => ReturnType,
    }
  }
}

/* ======================================================================
   Grid Node: The container for grid rows
====================================================================== */
export const Grid = Node.create({
  name: 'grid',

  content: 'gridRow+',
  group: 'block',

  parseHTML() {
    return [{ tag: 'div[data-type="grid"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, { 'data-type': 'grid', style: 'display: block;' }),
      0,
    ];
  },

  addCommands() {
    return {
      // Inserts a new grid with one row and two columns (default ratio 6/6) with initial content.
      addGrid:
        () =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            content: [
              {
                type: 'gridRow',
                content: [
                  {
                    type: 'gridColumn',
                    attrs: { ratio: 6 },
                    content: [
                      {
                        type: 'paragraph',
                        content: [{ type: 'text', text: 'Column 1 content' }],
                      },
                    ],
                  },
                  {
                    type: 'gridColumn',
                    attrs: { ratio: 6 },
                    content: [
                      {
                        type: 'paragraph',
                        content: [{ type: 'text', text: 'Column 2 content' }],
                      },
                    ],
                  },
                ],
              },
            ],
          });
        },
      // Adds a new row with two default columns (ratio 6/6) inside an existing grid.
      addGridRow:
        () =>
        ({ chain }) => {
          return chain()
            .insertContent({
              type: 'gridRow',
              content: [
                {
                  type: 'gridColumn',
                  attrs: { ratio: 6 },
                  content: [
                    {
                      type: 'paragraph',
                      content: [{ type: 'text', text: 'New Row, Column 1' }],
                    },
                  ],
                },
                {
                  type: 'gridColumn',
                  attrs: { ratio: 6 },
                  content: [
                    {
                      type: 'paragraph',
                      content: [{ type: 'text', text: 'New Row, Column 2' }],
                    },
                  ],
                },
              ],
            })
            .run();
        },
      // Toggle grid on/off.
      // Uses the editor's isActive method to check if a grid is active.
      // If active, it lifts (removes) the grid; otherwise, it inserts a new grid
      // that contains exactly one row and two columns with initial content.
      toggleGrid:
        () =>
        ({ editor, commands }) => {
          if (editor.isActive('grid')) {
            return commands.lift('grid');
          }
          return commands.insertContent({
            type: 'grid',
            content: [
              {
                type: 'gridRow',
                content: [
                  {
                    type: 'gridColumn',
                    attrs: { ratio: 6 },
                    content: [
                      {
                        type: 'paragraph',
                        content: [{ type: 'text', text: 'Column 1 content' }],
                      },
                    ],
                  },
                  {
                    type: 'gridColumn',
                    attrs: { ratio: 6 },
                    content: [
                      {
                        type: 'paragraph',
                        content: [{ type: 'text', text: 'Column 2 content' }],
                      },
                    ],
                  },
                ],
              },
            ],
          });
        },
      // Inserts a new column (default ratio of 6) into the current grid row.
      addGridColumn:
        () =>
        ({ chain }) => {
          return chain()
            .insertContent({
              type: 'gridColumn',
              attrs: { ratio: 6 },
              content: [
                {
                  type: 'paragraph',
                  content: [{ type: 'text', text: 'New Column' }],
                },
              ],
            })
            .run();
        },
    };
  },
});

/* ======================================================================
   GridRow Node: Represents a row. Its NodeView computes the grid template
   based on its child gridColumn nodes' `ratio` attributes.
====================================================================== */
export const GridRow = Node.create({
  name: 'gridRow',

  content: 'gridColumn+',

  parseHTML() {
    return [{ tag: 'div[data-type="grid-row"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    // Fallback render; ideally, the React NodeView below will override it.
    return [
      'div',
      mergeAttributes(HTMLAttributes, {
        'data-type': 'grid-row',
        style:
          'display: grid; grid-template-columns: 1fr 1fr; margin-bottom: 10px; border: 1px dashed gray;',
      }),
      0,
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(GridRowView);
  },
});

/* ======================================================================
   GridColumn Node: Represents an individual column.
   The `ratio` attribute defines its relative width in the grid row.
====================================================================== */
export const GridColumn = Node.create({
  name: 'gridColumn',

  content: 'block+',
  group: 'block',

  addOptions() {
    return {
      defaultRatio: 6,
    };
  },

  addAttributes() {
    return {
      ratio: {
        default: this.options.defaultRatio,
        parseHTML: element =>
          parseInt(element.getAttribute('data-ratio')) || this.options.defaultRatio,
        renderHTML: attributes => {
          // The grid row will compute the overall column widths,
          // so here we only output a data attribute.
          return { 'data-ratio': attributes.ratio };
        },
      },
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-type="grid-column"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, {
        'data-type': 'grid-column',
        style: 'padding: 5px; border: 1px dashed gray;',
      }),
      0,
    ];
  },
});

/* ======================================================================
   GridRowView: A React component used as a NodeView for GridRow.
   It computes the grid-template-columns style by reading each child node's ratio.
====================================================================== */
export const GridRowView = (props) => {
  const { node } = props;
  // Extract ratios from child gridColumn nodes.
  const ratios = node.content.content.map(child => child.attrs.ratio || 6);
  const templateColumns = ratios.map(r => `${r}fr`).join(' ');
  
  return (
    <NodeViewWrapper
      as="div"
      data-type="grid-row"
      style={{
        display: 'grid',
        gridTemplateColumns: templateColumns,
        marginBottom: '10px',
        border: '1px dashed gray',
      }}
    >
      <NodeViewContent />
    </NodeViewWrapper>
  );
};
