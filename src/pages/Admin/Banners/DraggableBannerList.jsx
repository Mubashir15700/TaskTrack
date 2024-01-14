import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const DraggableBannersList = ({ banners, onDragEnd }) => {
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="banners">
                {(provided) => (
                    <ul {...provided.droppableProps} ref={provided.innerRef}>
                        {banners.map((banner, index) => (
                            <Draggable key={banner._id} draggableId={banner._id} index={index}>
                                {(provided) => (
                                    <li
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        ref={provided.innerRef}
                                    >
                                        {/* Render your banner content here */}
                                        <div>
                                            <img
                                                src={`http://localhost:3000/uploads/banner/${banner.image}`}
                                                alt="Banner"
                                                style={{ width: '150px', height: '100px' }}
                                            />
                                            <p>{banner.title}</p>
                                        </div>
                                    </li>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default DraggableBannersList;
