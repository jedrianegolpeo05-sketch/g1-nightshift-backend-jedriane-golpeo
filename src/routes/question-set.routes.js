const { Router } = require('express');
const controller = require('../controllers/question-set.controller');

const router = Router();

router.get('/', controller.list);
router.get('/:id', controller.getOne);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);
router.post('/:id/questions', controller.addQuestion);

module.exports = router;