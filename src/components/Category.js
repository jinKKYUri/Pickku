import React, { useState } from 'react';
import '../styles/Category.css';

const categories = [
    { id: 1, name: '일러스트', href: '/category/1' },
    { id: 2, name: '버추얼 캐릭터', href: '/category/2' },
    { id: 3, name: 'Live2D', href: '/category/3' },
    { id: 4, name: '디자인', href: '/category/4' },
];
const Category = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <nav className="category-nav">
            <ul className="category-list">
                {categories.map((category) => (
                    <li
                        key={category.id}
                        onMouseEnter={() => setHoveredIndex(category.id)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className="category-item"
                    >
                        <div className="category-item-content">
                            <a className="category-link" href={category.link}>
                                <div className="category-text">
                                    <p className="category-name" variant="body1" color="gray900">
                                        {category.name}
                                    </p>
                                    <div className="category-hover-effect">
                                        <div className={
                                            hoveredIndex === category.id ? 'hovered' : 'not-hovered'
                                        }>

                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </li>
                ))}
            </ul>
        </nav>


    );
}
export default Category;