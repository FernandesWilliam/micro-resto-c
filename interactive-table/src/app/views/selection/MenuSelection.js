import './menu-selection.css';
import Title from '../title/Title';
import { useDispatch, useSelector } from 'react-redux';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../context/theme-context';
import { getMenu, selectMenu } from '../../store/catalog-store';
import ItemCard from './ItemCard';
import OrderRecapCard from '../order-recap/OrderRecapCard';
import useModal from '../modal/useModal';
import AddItemModal from '../add-item/AddItemModal';
import { selectOrderItems } from '../../store/order-store';

const filterMenuByCategory = (menu, category) => menu.filter((item) => item.category === category);

/**
 * Page to select our menu
 */
export default function MenuSelection() {
	const dispatch = useDispatch();
	const {theme} = useContext(ThemeContext);

	useEffect(() => {
		dispatch(getMenu({}));
	}, [dispatch]);

	const menu = useSelector(selectMenu);
	const orderItems = useSelector(selectOrderItems);
	const categories = [...new Set(menu.map(m => m.category))];

	const [category, setCategory] = useState({
		name: "STARTER",
		menu: filterMenuByCategory(menu, "STARTER")
	});

	useEffect(() => {
        console.log(`Fetch menu item elements by Starter`);
		setCategory({
			name: 'STARTER',
			menu: filterMenuByCategory(menu, 'STARTER')
		});
	}, [menu]);

	function handleCategoryChange(category) {
		setCategory({
			name: category,
			menu: filterMenuByCategory(menu, category)
		});
	}

	const [shown, toggle, itemId] = useModal();

	return (
		<div className="main" style={{ background: theme.background }}>
			<Title />
			<div id='category-selection' style={{ '--box-shadow-color': theme.button_shadow }}>
				{
					categories.map((categoryName, index) =>
						<div key={index}
							 onClick={() => handleCategoryChange(categoryName)}
							 className={category.name === categoryName ? 'selected' : ''}>
							{categoryName}
						</div>)
				}
			</div>
			<div className='menu-list'>
				{
					category.menu.map((dish, index) =>
						<ItemCard dish={dish}
								  onClick={() => toggle(dish._id)}
								  key={index} />)
				}
			</div>
			<OrderRecapCard items={orderItems} style={{ background: theme.background }} />

			<AddItemModal isShown={shown} hide={toggle} itemId={itemId} />
		</div>
	)
}