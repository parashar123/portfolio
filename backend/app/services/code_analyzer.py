import ast
import re
import subprocess
import tempfile
import os
from typing import Dict, List, Any, Optional
from dataclasses import dataclass
import json
import logging

logger = logging.getLogger(__name__)

@dataclass
class CodeIssue:
    type: str  # 'error', 'warning', 'info'
    message: str
    line: int
    severity: str
    rule_id: Optional[str] = None

@dataclass
class CodeMetrics:
    lines_of_code: int
    cyclomatic_complexity: int
    maintainability_index: float
    function_count: int
    class_count: int
    comment_ratio: float

@dataclass
class AnalysisResult:
    language: str
    metrics: CodeMetrics
    issues: List[CodeIssue]
    suggestions: List[str]
    security_issues: List[CodeIssue]
    performance_issues: List[CodeIssue]
    memory_issues: List[CodeIssue]
    code_smell_issues: List[CodeIssue]
    async_issues: List[CodeIssue]
    api_issues: List[CodeIssue]
    data_flow_issues: List[CodeIssue]
    dependency_issues: List[CodeIssue]
    testing_issues: List[CodeIssue]
    algorithm_issues: List[CodeIssue]

class CodeAnalyzer:
    def __init__(self):
        self.supported_languages = ['python', 'javascript', 'typescript', 'java', 'cpp']
    
    async def analyze_code(self, code: str, language: str = 'python') -> AnalysisResult:
        """Analyze code and return comprehensive results"""
        try:
            if language.lower() == 'python':
                return await self._analyze_python(code)
            else:
                return await self._analyze_generic(code, language)
        except Exception as e:
            logger.error(f"Code analysis failed: {e}")
            return self._create_error_result(str(e))
    
    async def _analyze_python(self, code: str) -> AnalysisResult:
        """Comprehensive Python code analysis"""
        issues = []
        suggestions = []
        security_issues = []
        performance_issues = []
        memory_issues = []
        code_smell_issues = []
        async_issues = []
        api_issues = []
        data_flow_issues = []
        dependency_issues = []
        testing_issues = []
        algorithm_issues = []
        
        # Basic AST analysis
        try:
            tree = ast.parse(code)
            metrics = self._calculate_python_metrics(code, tree)
            
            # AST-based analysis
            issues.extend(self._analyze_ast_issues(tree))
            suggestions.extend(self._generate_ast_suggestions(tree))
            
        except SyntaxError as e:
            issues.append(CodeIssue(
                type='error',
                message=f'Syntax error: {e.msg}',
                line=e.lineno or 1,
                severity='high'
            ))
            metrics = self._create_default_metrics(code)
        
        # Security analysis with bandit
        security_issues.extend(await self._run_bandit_analysis(code))
        
        # Performance analysis
        performance_issues.extend(self._analyze_performance_issues(code))
        
        # Memory leak analysis
        memory_issues.extend(self._analyze_memory_issues(code))
        
        # Code smell analysis
        code_smell_issues.extend(self._analyze_code_smells(code))
        
        # Async/await anti-pattern analysis
        async_issues.extend(self._analyze_async_antipatterns(code))
        
        # API design analysis
        api_issues.extend(self._analyze_api_design_issues(code))
        
        # Data flow analysis
        data_flow_issues.extend(self._analyze_data_flow_issues(code))
        
        # Dependency vulnerability analysis
        dependency_issues.extend(self._analyze_dependency_vulnerabilities(code))
        
        # Testing gaps analysis
        testing_issues.extend(self._analyze_testing_gaps(code))
        
        # Algorithm efficiency analysis
        algorithm_issues.extend(self._analyze_algorithm_efficiency(code))
        
        # Additional suggestions
        suggestions.extend(self._generate_general_suggestions(code))
        suggestions.extend(self._generate_memory_suggestions(memory_issues))
        suggestions.extend(self._generate_code_smell_suggestions(code_smell_issues))
        suggestions.extend(self._generate_async_suggestions(async_issues))
        suggestions.extend(self._generate_api_suggestions(api_issues))
        suggestions.extend(self._generate_data_flow_suggestions(data_flow_issues))
        suggestions.extend(self._generate_dependency_suggestions(dependency_issues))
        suggestions.extend(self._generate_testing_suggestions(testing_issues))
        suggestions.extend(self._generate_algorithm_suggestions(algorithm_issues))
        
        return AnalysisResult(
            language='python',
            metrics=metrics,
            issues=issues,
            suggestions=suggestions,
            security_issues=security_issues,
            performance_issues=performance_issues,
            memory_issues=memory_issues,
            code_smell_issues=code_smell_issues,
            async_issues=async_issues,
            api_issues=api_issues,
            data_flow_issues=data_flow_issues,
            dependency_issues=dependency_issues,
            testing_issues=testing_issues,
            algorithm_issues=algorithm_issues
        )
    
    def _calculate_python_metrics(self, code: str, tree: ast.AST) -> CodeMetrics:
        """Calculate Python code metrics"""
        lines = code.split('\n')
        lines_of_code = len([line for line in lines if line.strip() and not line.strip().startswith('#')])
        
        # Count functions and classes
        function_count = len([node for node in ast.walk(tree) if isinstance(node, ast.FunctionDef)])
        class_count = len([node for node in ast.walk(tree) if isinstance(node, ast.ClassDef)])
        
        # Calculate cyclomatic complexity
        complexity = self._calculate_cyclomatic_complexity(tree)
        
        # Calculate comment ratio
        comment_lines = len([line for line in lines if line.strip().startswith('#')])
        comment_ratio = comment_lines / max(lines_of_code, 1) * 100
        
        # Calculate maintainability index (simplified)
        maintainability_index = max(0, 100 - (complexity * 2) - (lines_of_code / 10))
        
        return CodeMetrics(
            lines_of_code=lines_of_code,
            cyclomatic_complexity=complexity,
            maintainability_index=round(maintainability_index, 1),
            function_count=function_count,
            class_count=class_count,
            comment_ratio=round(comment_ratio, 1)
        )
    
    def _calculate_cyclomatic_complexity(self, tree: ast.AST) -> int:
        """Calculate cyclomatic complexity"""
        complexity = 1  # Base complexity
        
        for node in ast.walk(tree):
            if isinstance(node, (ast.If, ast.While, ast.For, ast.AsyncFor)):
                complexity += 1
            elif isinstance(node, ast.ExceptHandler):
                complexity += 1
            elif isinstance(node, (ast.And, ast.Or)):
                complexity += 1
        
        return complexity
    
    def _analyze_ast_issues(self, tree: ast.AST) -> List[CodeIssue]:
        """Analyze AST for common issues"""
        issues = []
        
        for node in ast.walk(tree):
            # Check for bare except
            if isinstance(node, ast.ExceptHandler) and node.type is None:
                issues.append(CodeIssue(
                    type='warning',
                    message='Bare except clause - consider specifying exception types',
                    line=node.lineno,
                    severity='medium',
                    rule_id='BARE_EXCEPT'
                ))
            
            # Check for unused variables
            if isinstance(node, ast.Assign):
                for target in node.targets:
                    if isinstance(target, ast.Name) and target.id.startswith('_'):
                        continue  # Skip variables starting with underscore
                    # This is a simplified check - in reality, you'd need more context
        
        return issues
    
    def _generate_ast_suggestions(self, tree: ast.AST) -> List[str]:
        """Generate suggestions based on AST analysis"""
        suggestions = []
        
        # Check for missing type hints
        functions_without_hints = []
        for node in ast.walk(tree):
            if isinstance(node, ast.FunctionDef):
                if not node.returns and not any(isinstance(arg.annotation, ast.Name) for arg in node.args.args):
                    functions_without_hints.append(node.name)
        
        if functions_without_hints:
            suggestions.append(f"Consider adding type hints to functions: {', '.join(functions_without_hints[:3])}")
        
        # Check for long functions
        for node in ast.walk(tree):
            if isinstance(node, ast.FunctionDef):
                if len(node.body) > 20:
                    suggestions.append(f"Function '{node.name}' is quite long - consider breaking it into smaller functions")
        
        return suggestions
    
    async def _run_bandit_analysis(self, code: str) -> List[CodeIssue]:
        """Run bandit security analysis"""
        security_issues = []
        
        try:
            # Create temporary file
            with tempfile.NamedTemporaryFile(mode='w', suffix='.py', delete=False) as f:
                f.write(code)
                temp_file = f.name
            
            # Run bandit
            result = subprocess.run(
                ['bandit', '-f', 'json', temp_file],
                capture_output=True,
                text=True,
                timeout=10
            )
            
            if result.returncode == 0:
                data = json.loads(result.stdout)
                for issue in data.get('results', []):
                    security_issues.append(CodeIssue(
                        type='error' if issue['issue_severity'] == 'HIGH' else 'warning',
                        message=f"Security: {issue['issue_text']}",
                        line=issue['line_number'],
                        severity=issue['issue_severity'].lower(),
                        rule_id=issue['test_id']
                    ))
            
            # Clean up
            os.unlink(temp_file)
            
        except Exception as e:
            logger.warning(f"Bandit analysis failed: {e}")
            # Add a generic security suggestion
            security_issues.append(CodeIssue(
                type='info',
                message='Consider running security analysis on your code',
                line=1,
                severity='low'
            ))
        
        # Enhanced security analysis
        security_issues.extend(self._analyze_security_vulnerabilities(code))
        
        return security_issues
    
    def _analyze_security_vulnerabilities(self, code: str) -> List[CodeIssue]:
        """Enhanced security vulnerability detection"""
        security_issues = []
        lines = code.split('\n')
        
        for i, line in enumerate(lines, 1):
            line_lower = line.lower().strip()
            
            # Enhanced SQL Injection Detection
            if any(pattern in line_lower for pattern in [
                'execute(', 'query(', 'cursor.execute', 'db.execute', 'raw(', 'extra('
            ]) and ('%s' in line or '+' in line or 'format(' in line or 'f"' in line or '{' in line):
                security_issues.append(CodeIssue(
                    type='vulnerability',
                    message='SQL injection vulnerability - use parameterized queries instead of string interpolation',
                    line=i,
                    severity='high',
                    rule_id='SEC_SQL_INJECTION'
                ))
            
            # Django/ORM SQL Injection
            if any(pattern in line_lower for pattern in [
                'objects.filter(', 'objects.get(', 'objects.raw('
            ]) and ('%s' in line or '+' in line or 'format(' in line or 'f"' in line):
                security_issues.append(CodeIssue(
                    type='vulnerability',
                    message='ORM SQL injection - use parameterized queries with Q objects',
                    line=i,
                    severity='high',
                    rule_id='SEC_ORM_SQL_INJECTION'
                ))
            
            # XSS Detection
            if any(pattern in line_lower for pattern in [
                'innerhtml', 'outerhtml', 'document.write', 'eval('
            ]) and ('+' in line or 'format(' in line or 'f"' in line):
                security_issues.append(CodeIssue(
                    type='vulnerability',
                    message='Potential XSS vulnerability - sanitize user input before DOM manipulation',
                    line=i,
                    severity='high',
                    rule_id='SEC_XSS'
                ))
            
            # Hardcoded Secrets
            if any(pattern in line_lower for pattern in [
                'password=', 'secret=', 'key=', 'token=', 'api_key='
            ]) and ('"' in line or "'" in line):
                security_issues.append(CodeIssue(
                    type='vulnerability',
                    message='Hardcoded secret detected - use environment variables or secure storage',
                    line=i,
                    severity='high',
                    rule_id='SEC_HARDCODED_SECRET'
                ))
            
            # Insecure Deserialization
            if any(pattern in line_lower for pattern in [
                'pickle.loads', 'marshal.loads', 'yaml.load(', 'eval('
            ]):
                security_issues.append(CodeIssue(
                    type='vulnerability',
                    message='Insecure deserialization - use safe deserialization methods',
                    line=i,
                    severity='high',
                    rule_id='SEC_INSECURE_DESERIALIZATION'
                ))
            
            # Weak Cryptography
            if any(pattern in line_lower for pattern in [
                'md5(', 'sha1(', 'des(', 'rc4('
            ]):
                security_issues.append(CodeIssue(
                    type='vulnerability',
                    message='Weak cryptographic algorithm - use stronger alternatives (SHA-256, AES)',
                    line=i,
                    severity='medium',
                    rule_id='SEC_WEAK_CRYPTO'
                ))
            
            # Missing CSRF Protection
            if 'csrf' not in line_lower and any(pattern in line_lower for pattern in [
                '@app.route', 'def post(', 'def put(', 'def delete('
            ]):
                security_issues.append(CodeIssue(
                    type='vulnerability',
                    message='Missing CSRF protection - implement CSRF tokens for state-changing operations',
                    line=i,
                    severity='medium',
                    rule_id='SEC_MISSING_CSRF'
                ))
            
            # Authentication Bypass
            if any(pattern in line_lower for pattern in [
                'if user_id == 1:', 'if admin == true:', 'if role == "admin"'
            ]) and 'authenticate' not in line_lower:
                security_issues.append(CodeIssue(
                    type='vulnerability',
                    message='Potential authentication bypass - implement proper authentication checks',
                    line=i,
                    severity='high',
                    rule_id='SEC_AUTH_BYPASS'
                ))
            
            # Path Traversal
            if any(pattern in line_lower for pattern in [
                'open(', 'file(', 'read('
            ]) and ('../' in line or '..\\' in line):
                security_issues.append(CodeIssue(
                    type='vulnerability',
                    message='Potential path traversal - validate and sanitize file paths',
                    line=i,
                    severity='high',
                    rule_id='SEC_PATH_TRAVERSAL'
                ))
            
            # Enhanced Command Injection Detection
            if any(pattern in line_lower for pattern in [
                'os.system', 'subprocess.call', 'subprocess.run', 'exec(', 'popen('
            ]) and ('+' in line or 'format(' in line or 'f"' in line):
                security_issues.append(CodeIssue(
                    type='vulnerability',
                    message='Command injection vulnerability - validate and sanitize command inputs',
                    line=i,
                    severity='high',
                    rule_id='SEC_COMMAND_INJECTION'
                ))
            
            # Shell=True Command Injection (Critical)
            if 'subprocess.run(' in line_lower and 'shell=true' in line_lower:
                security_issues.append(CodeIssue(
                    type='vulnerability',
                    message='Critical command injection - shell=True with user input is extremely dangerous',
                    line=i,
                    severity='critical',
                    rule_id='SEC_SHELL_INJECTION'
                ))
            
            # Sensitive Data Exposure
            if any(pattern in line_lower for pattern in [
                'password', 'credit_card', 'ssn', 'social_security', 'api_key', 'secret'
            ]) and any(return_pattern in line_lower for return_pattern in [
                'return', 'jsonify', 'response', 'render'
            ]):
                security_issues.append(CodeIssue(
                    type='vulnerability',
                    message='Sensitive data exposure - remove sensitive fields from API responses',
                    line=i,
                    severity='high',
                    rule_id='SEC_SENSITIVE_DATA_EXPOSURE'
                ))
            
            # Hardcoded Credentials (Enhanced)
            if any(pattern in line_lower for pattern in [
                'password=', 'secret=', 'key=', 'token=', 'api_key=', 'database_password='
            ]) and ('"' in line or "'" in line):
                security_issues.append(CodeIssue(
                    type='vulnerability',
                    message='Hardcoded credentials detected - use environment variables or secure storage',
                    line=i,
                    severity='high',
                    rule_id='SEC_HARDCODED_CREDENTIALS'
                ))
            
            # Hardcoded credentials in dictionaries/configs
            if any(pattern in line_lower for pattern in [
                "'password'", '"password"', "'secret'", '"secret"', "'api_key'", '"api_key"'
            ]) and ':' in line and ('"' in line or "'" in line):
                security_issues.append(CodeIssue(
                    type='vulnerability',
                    message='Hardcoded credentials in configuration - use environment variables',
                    line=i,
                    severity='high',
                    rule_id='SEC_HARDCODED_CREDENTIALS'
                ))
            
            # Path Traversal (Enhanced)
            if any(pattern in line_lower for pattern in [
                'open(', 'file(', 'read(', 'write(', 'save(', 'upload('
            ]) and ('../' in line or '..\\' in line or 'filename' in line_lower):
                security_issues.append(CodeIssue(
                    type='vulnerability',
                    message='Path traversal vulnerability - validate and sanitize file paths',
                    line=i,
                    severity='high',
                    rule_id='SEC_PATH_TRAVERSAL'
                ))
            
            # Missing Input Validation
            if any(pattern in line_lower for pattern in [
                'request.get', 'request.post', 'request.args', 'request.form'
            ]) and 'validate' not in line_lower and 'sanitize' not in line_lower:
                security_issues.append(CodeIssue(
                    type='vulnerability',
                    message='Missing input validation - validate and sanitize user inputs',
                    line=i,
                    severity='medium',
                    rule_id='SEC_MISSING_INPUT_VALIDATION'
                ))
        
        return security_issues
    
    def _analyze_performance_issues(self, code: str) -> List[CodeIssue]:
        """Analyze code for performance issues"""
        performance_issues = []
        lines = code.split('\n')
        
        for i, line in enumerate(lines, 1):
            line_lower = line.lower()
            
            # Check for inefficient patterns
            if 'for i in range(len(' in line_lower:
                performance_issues.append(CodeIssue(
                    type='warning',
                    message='Consider using enumerate() instead of range(len())',
                    line=i,
                    severity='medium',
                    rule_id='PERF_ENUMERATE'
                ))
            
            if '.append(' in line_lower and 'for' in line_lower:
                performance_issues.append(CodeIssue(
                    type='info',
                    message='Consider using list comprehension for better performance',
                    line=i,
                    severity='low',
                    rule_id='PERF_LIST_COMP'
                ))
            
            if 'import *' in line_lower:
                performance_issues.append(CodeIssue(
                    type='warning',
                    message='Avoid wildcard imports - they can impact performance and readability',
                    line=i,
                    severity='medium',
                    rule_id='PERF_WILDCARD_IMPORT'
                ))
            
            # Enhanced N+1 Query Detection
            if 'for ' in line_lower and ':' in line:
                # Check for N+1 patterns in the loop body
                loop_body_lines = lines[i:i+10]  # Check next 10 lines
                for body_line in loop_body_lines:
                    body_lower = body_line.lower()
                    if any(access_pattern in body_lower for access_pattern in [
                        '.user.', '.order.', '.item.', '.profile.', '.department.', '.category.'
                    ]) and any(query_pattern in body_lower for query_pattern in [
                        'objects.filter', 'objects.get', 'query(', 'db.'
                    ]):
                        performance_issues.append(CodeIssue(
                            type='performance_issue',
                            message='N+1 query problem detected - use select_related() or prefetch_related() for eager loading',
                            line=i,
                            severity='high',
                            rule_id='PERF_N_PLUS_ONE_QUERY'
                        ))
                        break
            
            # ORM Query in Loop Detection
            if 'for ' in line_lower and any(orm_pattern in line_lower for orm_pattern in [
                'objects.filter(', 'objects.get(', 'objects.all(', 'objects.values('
            ]):
                performance_issues.append(CodeIssue(
                    type='performance_issue',
                    message='ORM query in loop - move query outside loop or use bulk operations',
                    line=i,
                    severity='high',
                    rule_id='PERF_ORM_IN_LOOP'
                ))
            
            # Missing select_related/prefetch_related
            if any(orm_pattern in line_lower for orm_pattern in [
                'objects.filter(', 'objects.get(', 'objects.all('
            ]) and 'select_related' not in line_lower and 'prefetch_related' not in line_lower:
                # Check if this is accessing related fields
                context_lines = lines[max(0, i-5):i+5]
                if any('.' in l and any(related in l.lower() for related in ['user.', 'order.', 'item.', 'profile.']) for l in context_lines):
                    performance_issues.append(CodeIssue(
                        type='performance_issue',
                        message='Missing select_related/prefetch_related - add eager loading for related fields',
                        line=i,
                        severity='medium',
                        rule_id='PERF_MISSING_EAGER_LOADING'
                    ))
            
            # Inefficient Aggregation in Loop
            if 'for ' in line_lower:
                # Check for aggregation in the loop body
                loop_body_lines = lines[i:i+10]
                for body_line in loop_body_lines:
                    body_lower = body_line.lower()
                    if any(agg_pattern in body_lower for agg_pattern in [
                        '.count()', '.sum()', '.avg()', '.aggregate(', '.annotate('
                    ]) and any(orm_pattern in body_lower for orm_pattern in [
                        'objects.filter', 'objects.get', 'objects.all'
                    ]):
                        performance_issues.append(CodeIssue(
                            type='performance_issue',
                            message='Aggregation in loop - use bulk aggregation or annotate() for better performance',
                            line=i,
                            severity='high',
                            rule_id='PERF_AGGREGATION_IN_LOOP'
                        ))
                        break
            
            # Nested Loop with Database Queries
            if 'for ' in line_lower:
                # Check for nested loops in nearby lines
                nested_loop_found = False
                for j in range(i+1, min(i+10, len(lines))):
                    if 'for ' in lines[j].lower() and any(db_pattern in lines[j].lower() for db_pattern in [
                        'objects.filter', 'objects.get', 'query('
                    ]):
                        nested_loop_found = True
                        break
                
                if nested_loop_found:
                    performance_issues.append(CodeIssue(
                        type='performance_issue',
                        message='Nested loop with database queries - use bulk operations or optimize query structure',
                        line=i,
                        severity='high',
                        rule_id='PERF_NESTED_LOOP_QUERIES'
                    ))
            
            # NEW: Inefficient Algorithm Detection
            if any(pattern in line_lower for pattern in [
                'for i in range(len(', 'for j in range(len('
            ]) and 'for' in lines[i-2:i+2]:  # Check nearby lines
                performance_issues.append(CodeIssue(
                    type='performance_issue',
                    message='Nested loops detected - consider O(n²) complexity optimization',
                    line=i,
                    severity='medium',
                    rule_id='PERF_NESTED_LOOPS'
                ))
            
            # NEW: Blocking Operations in Async Code
            if any(async_pattern in line_lower for async_pattern in [
                'async def', 'await '
            ]) and any(blocking_pattern in line_lower for blocking_pattern in [
                'time.sleep(', 'requests.get(', 'requests.post(', 'open(', 'file('
            ]):
                performance_issues.append(CodeIssue(
                    type='performance_issue',
                    message='Blocking operation in async function - use async alternatives',
                    line=i,
                    severity='medium',
                    rule_id='PERF_BLOCKING_IN_ASYNC'
                ))
            
            # NEW: Unnecessary Object Creation
            if any(pattern in line_lower for pattern in [
                'str(', 'int(', 'list(', 'dict('
            ]) and 'for' in line_lower:
                performance_issues.append(CodeIssue(
                    type='performance_issue',
                    message='Unnecessary object creation in loop - consider pre-allocating or caching',
                    line=i,
                    severity='low',
                    rule_id='PERF_UNNECESSARY_OBJECTS'
                ))
            
            # NEW: String Concatenation in Loops
            if ('+' in line_lower and '=' in line_lower and 
                any(var in line_lower for var in ['result', 'output', 'text', 'string'])):
                # Check if this is in a loop context
                context_lines = lines[max(0, i-3):i+1]
                if any('for ' in l.lower() for l in context_lines):
                    performance_issues.append(CodeIssue(
                        type='performance_issue',
                        message='String concatenation in loop - use join() or f-strings for better performance',
                        line=i,
                        severity='medium',
                        rule_id='PERF_STRING_CONCAT_LOOP'
                    ))
            
            # NEW: Resource Contention
            if any(pattern in line_lower for pattern in [
                'threading.lock', 'multiprocessing.lock', 'asyncio.lock'
            ]) and 'with' not in line_lower:
                performance_issues.append(CodeIssue(
                    type='performance_issue',
                    message='Lock without context manager - potential deadlock or resource leak',
                    line=i,
                    severity='high',
                    rule_id='PERF_LOCK_WITHOUT_CONTEXT'
                ))
        
        return performance_issues
    
    def _analyze_async_antipatterns(self, code: str) -> List[CodeIssue]:
        """Analyze code for async/await anti-patterns and concurrency issues"""
        async_issues = []
        lines = code.split('\n')
        
        for i, line in enumerate(lines, 1):
            line_lower = line.lower().strip()
            
            # Blocking sleep in async function
            if 'time.sleep(' in line_lower:
                # Check if we're in an async context
                context_lines = lines[max(0, i-15):i+5]
                if any('async def' in l.lower() for l in context_lines) or any('await ' in l.lower() for l in context_lines):
                    async_issues.append(CodeIssue(
                        type='async_antipattern',
                        message='time.sleep() blocks event loop - use asyncio.sleep()',
                        line=i,
                        severity='critical',
                        rule_id='ASYNC_BLOCKING_SLEEP'
                    ))
            
            # Sequential async operations instead of gather
            if 'for ' in line_lower and 'await ' in line_lower:
                # Check if this is in an async function and could be parallelized
                context_lines = lines[max(0, i-10):i+5]
                if any('async def' in l.lower() for l in context_lines):
                    async_issues.append(CodeIssue(
                        type='async_antipattern',
                        message='Sequential async operations - use asyncio.gather() for concurrency',
                        line=i,
                        severity='high',
                        rule_id='ASYNC_SEQUENTIAL_OPERATIONS'
                    ))
            
            # CPU-bound work in async function
            if any(cpu_pattern in line_lower for cpu_pattern in [
                'for i in range(', 'while ', 'sum(', 'max(', 'min(', 'sorted('
            ]):
                context_lines = lines[max(0, i-15):i+5]
                if any('async def' in l.lower() for l in context_lines):
                    async_issues.append(CodeIssue(
                        type='async_antipattern',
                        message='CPU-bound work in async function - use asyncio.create_task() or thread pool',
                        line=i,
                        severity='medium',
                        rule_id='ASYNC_CPU_BOUND_WORK'
                    ))
            
            # Missing await on async function call
            if '=' in line and any(async_func in line_lower for async_func in [
                'async def', 'async with', 'async for'
            ]) and 'await ' not in line_lower:
                context_lines = lines[max(0, i-10):i+5]
                if any('async def' in l.lower() for l in context_lines):
                    async_issues.append(CodeIssue(
                        type='async_antipattern',
                        message='Missing await on async function call - will return coroutine object',
                        line=i,
                        severity='high',
                        rule_id='ASYNC_MISSING_AWAIT'
                    ))
            
            # Blocking I/O in async function
            if any(blocking_pattern in line_lower for blocking_pattern in [
                'requests.get(', 'requests.post(', 'open(', 'file(', 'input('
            ]):
                context_lines = lines[max(0, i-15):i+5]
                if any('async def' in l.lower() for l in context_lines):
                    async_issues.append(CodeIssue(
                        type='async_antipattern',
                        message='Blocking I/O in async function - use async alternatives (aiohttp, aiofiles)',
                        line=i,
                        severity='medium',
                        rule_id='ASYNC_BLOCKING_IO'
                    ))
            
            # Creating new session per request
            if 'aiohttp.clientsession()' in line_lower and 'async with' in line_lower:
                async_issues.append(CodeIssue(
                    type='async_antipattern',
                    message='Creating new aiohttp session per request - use session pooling',
                    line=i,
                    severity='high',
                    rule_id='ASYNC_SESSION_CREATION'
                ))
            
            # Missing return_exceptions in asyncio.gather
            if 'asyncio.gather(' in line_lower and 'return_exceptions' not in line_lower:
                async_issues.append(CodeIssue(
                    type='async_antipattern',
                    message='asyncio.gather() without return_exceptions - one failure kills all tasks',
                    line=i,
                    severity='medium',
                    rule_id='ASYNC_GATHER_NO_EXCEPTIONS'
                ))
            
            
            # Race condition potential
            if any(shared_pattern in line_lower for shared_pattern in [
                'global ', 'self.', 'class '
            ]) and any(async_pattern in line_lower for async_pattern in ['await ', 'async ']):
                # Check if this modifies shared state
                if any(modify_pattern in line_lower for modify_pattern in [
                    '=', '+=', '-=', '*=', '/=', '.append(', '.update('
                ]):
                    async_issues.append(CodeIssue(
                        type='async_antipattern',
                        message='Potential race condition - modifying shared state in async context',
                        line=i,
                        severity='high',
                        rule_id='ASYNC_RACE_CONDITION'
                    ))
            
            # Deadlock potential with locks
            if any(lock_pattern in line_lower for lock_pattern in [
                'asyncio.lock', 'asyncio.semaphore', 'asyncio.bounded_semaphore'
            ]) and 'async with' not in line_lower:
                async_issues.append(CodeIssue(
                    type='async_antipattern',
                    message='Lock without async context manager - potential deadlock',
                    line=i,
                    severity='high',
                    rule_id='ASYNC_LOCK_WITHOUT_CONTEXT'
                ))
        
        return async_issues
    
    def _analyze_api_design_issues(self, code: str) -> List[CodeIssue]:
        """Analyze code for API design issues and REST violations"""
        api_issues = []
        lines = code.split('\n')
        
        for i, line in enumerate(lines, 1):
            line_lower = line.lower().strip()
            
            # REST API violations
            if any(rest_pattern in line_lower for rest_pattern in [
                '@app.route(', '@router.', '@api_view', 'def get_', 'def post_', 'def put_', 'def delete_'
            ]):
                # Check for proper HTTP method usage
                if 'def get_' in line_lower and any(verb in line_lower for verb in ['post', 'put', 'delete', 'patch']):
                    api_issues.append(CodeIssue(
                        type='api_design',
                        message='GET endpoint should not modify data - use POST/PUT/DELETE for mutations',
                        line=i,
                        severity='high',
                        rule_id='API_GET_MUTATION'
                    ))
                
                # Check for missing error handling
                context_lines = lines[i:i+10]  # Next 10 lines
                if not any('try:' in l.lower() or 'except' in l.lower() or 'raise' in l.lower() for l in context_lines):
                    api_issues.append(CodeIssue(
                        type='api_design',
                        message='API endpoint missing error handling - add try/except blocks',
                        line=i,
                        severity='medium',
                        rule_id='API_MISSING_ERROR_HANDLING'
                    ))
            
            # Inconsistent naming conventions
            if any(route_pattern in line_lower for route_pattern in [
                '@app.route(', '@router.', 'path=', 'url='
            ]):
                # Check for inconsistent URL patterns
                if any(inconsistent in line_lower for inconsistent in [
                    '/get_', '/post_', '/put_', '/delete_', '/fetch_', '/create_', '/update_', '/remove_'
                ]):
                    api_issues.append(CodeIssue(
                        type='api_design',
                        message='REST URLs should not include HTTP verbs - use resource-based naming',
                        line=i,
                        severity='medium',
                        rule_id='API_VERB_IN_URL'
                    ))
                
                # Check for inconsistent case
                if any(case_pattern in line_lower for case_pattern in [
                    '/userprofile', '/user_profile', '/userprofile/', '/user_profile/'
                ]):
                    api_issues.append(CodeIssue(
                        type='api_design',
                        message='Inconsistent URL naming convention - use kebab-case or camelCase consistently',
                        line=i,
                        severity='low',
                        rule_id='API_INCONSISTENT_NAMING'
                    ))
            
            # Missing API versioning
            if any(api_pattern in line_lower for api_pattern in [
                '@app.route(', '@router.', 'fastapi', 'flask', 'django'
            ]) and 'v1' not in line_lower and 'version' not in line_lower:
                api_issues.append(CodeIssue(
                    type='api_design',
                    message='API endpoint missing versioning - consider adding /v1/ prefix',
                    line=i,
                    severity='low',
                    rule_id='API_MISSING_VERSIONING'
                ))
            
            # Missing input validation
            if any(param_pattern in line_lower for param_pattern in [
                'request.json', 'request.form', 'request.args', 'request.data'
            ]):
                context_lines = lines[max(0, i-5):i+10]
                if not any(validation in l.lower() for validation in [
                    'validate', 'schema', 'pydantic', 'marshmallow', 'validator'
                ] for l in context_lines):
                    api_issues.append(CodeIssue(
                        type='api_design',
                        message='API endpoint missing input validation - add schema validation',
                        line=i,
                        severity='high',
                        rule_id='API_MISSING_VALIDATION'
                    ))
            
            # Missing authentication/authorization
            if any(api_pattern in line_lower for api_pattern in [
                '@app.route(', '@router.', 'def get_', 'def post_', 'def put_', 'def delete_'
            ]):
                context_lines = lines[max(0, i-10):i+10]
                if not any(auth_pattern in l.lower() for auth_pattern in [
                    'auth', 'login', 'token', 'jwt', 'oauth', 'permission', 'role', 'decorator'
                ] for l in context_lines):
                    api_issues.append(CodeIssue(
                        type='api_design',
                        message='API endpoint missing authentication/authorization - add security checks',
                        line=i,
                        severity='high',
                        rule_id='API_MISSING_AUTH'
                    ))
            
            # Missing rate limiting
            if any(api_pattern in line_lower for api_pattern in [
                '@app.route(', '@router.', 'def get_', 'def post_', 'def put_', 'def delete_'
            ]):
                context_lines = lines[max(0, i-10):i+10]
                if not any(rate_pattern in l.lower() for rate_pattern in [
                    'rate_limit', 'throttle', 'limiter', 'quota'
                ] for l in context_lines):
                    api_issues.append(CodeIssue(
                        type='api_design',
                        message='API endpoint missing rate limiting - add throttling protection',
                        line=i,
                        severity='medium',
                        rule_id='API_MISSING_RATE_LIMITING'
                    ))
            
            # Missing CORS headers
            if any(api_pattern in line_lower for api_pattern in [
                '@app.route(', '@router.', 'def get_', 'def post_', 'def put_', 'def delete_'
            ]):
                context_lines = lines[max(0, i-10):i+10]
                if not any(cors_pattern in l.lower() for cors_pattern in [
                    'cors', 'access-control', 'cross-origin'
                ] for l in context_lines):
                    api_issues.append(CodeIssue(
                        type='api_design',
                        message='API endpoint missing CORS headers - add cross-origin support',
                        line=i,
                        severity='medium',
                        rule_id='API_MISSING_CORS'
                    ))
            
            # Missing response headers
            if any(response_pattern in line_lower for response_pattern in [
                'return jsonify', 'return json', 'return response', 'return data'
            ]):
                context_lines = lines[max(0, i-5):i+5]
                if not any(header_pattern in l.lower() for header_pattern in [
                    'content-type', 'content_type', 'headers', 'response.headers'
                ] for l in context_lines):
                    api_issues.append(CodeIssue(
                        type='api_design',
                        message='API response missing proper headers - set Content-Type and other headers',
                        line=i,
                        severity='low',
                        rule_id='API_MISSING_HEADERS'
                    ))
            
            # Missing pagination
            if any(list_pattern in line_lower for list_pattern in [
                'return users', 'return items', 'return data', 'return list'
            ]) and any(api_pattern in lines[max(0, i-10):i] for api_pattern in [
                '@app.route', '@router', 'def get_', 'def post_'
            ]):
                context_lines = lines[max(0, i-10):i+10]
                if not any(page_pattern in l.lower() for page_pattern in [
                    'page', 'limit', 'offset', 'pagination', 'per_page'
                ] for l in context_lines):
                    api_issues.append(CodeIssue(
                        type='api_design',
                        message='List API endpoint missing pagination - add page/limit parameters',
                        line=i,
                        severity='medium',
                        rule_id='API_MISSING_PAGINATION'
                    ))
            
            # Missing API documentation
            if any(api_pattern in line_lower for api_pattern in [
                '@app.route(', '@router.', 'def get_', 'def post_', 'def put_', 'def delete_'
            ]):
                context_lines = lines[max(0, i-10):i+10]
                if not any(doc_pattern in l.lower() for doc_pattern in [
                    'docstring', 'summary', 'description', 'tags', 'responses'
                ] for l in context_lines):
                    api_issues.append(CodeIssue(
                        type='api_design',
                        message='API endpoint missing documentation - add docstrings or OpenAPI annotations',
                        line=i,
                        severity='low',
                        rule_id='API_MISSING_DOCUMENTATION'
                    ))
        
        return api_issues
    
    def _analyze_data_flow_issues(self, code: str) -> List[CodeIssue]:
        """Analyze code for data flow issues, privacy leaks, and sensitive data exposure"""
        data_flow_issues = []
        lines = code.split('\n')
        
        # Track sensitive data patterns
        sensitive_patterns = [
            'password', 'passwd', 'pwd', 'secret', 'token', 'key', 'api_key',
            'ssn', 'social_security', 'credit_card', 'card_number', 'cvv',
            'email', 'phone', 'address', 'personal', 'private', 'confidential'
        ]
        
        # Track data sources (inputs)
        input_sources = [
            'request.json', 'request.form', 'request.args', 'request.data',
            'input(', 'raw_input(', 'sys.argv', 'os.environ', 'config',
            'database', 'file', 'upload', 'user_input'
        ]
        
        # Track data sinks (outputs)
        output_sinks = [
            'print(', 'logging', 'log', 'console.log', 'response', 'return',
            'jsonify', 'json.dumps', 'write(', 'save', 'store', 'database'
        ]
        
        for i, line in enumerate(lines, 1):
            line_lower = line.lower().strip()
            
            # Sensitive data exposure in logs
            if any(log_pattern in line_lower for log_pattern in [
                'print(', 'logging', 'log.', 'logger.', 'console.log'
            ]):
                if any(sensitive in line_lower for sensitive in sensitive_patterns):
                    data_flow_issues.append(CodeIssue(
                        type='data_flow',
                        message='Sensitive data exposed in logs - remove or mask sensitive information',
                        line=i,
                        severity='high',
                        rule_id='DATA_SENSITIVE_IN_LOGS'
                    ))
            
            # Unvalidated input from external sources
            if any(input_pattern in line_lower for input_pattern in input_sources):
                context_lines = lines[max(0, i-5):i+10]
                if not any(validation in l.lower() for validation in [
                    'validate', 'sanitize', 'escape', 'strip', 'clean'
                ] for l in context_lines):
                    data_flow_issues.append(CodeIssue(
                        type='data_flow',
                        message='Unvalidated input from external source - add input validation and sanitization',
                        line=i,
                        severity='high',
                        rule_id='DATA_UNVALIDATED_INPUT'
                    ))
            
            # Sensitive data in response/return
            if any(output_pattern in line_lower for output_pattern in output_sinks):
                if any(sensitive in line_lower for sensitive in sensitive_patterns):
                    data_flow_issues.append(CodeIssue(
                        type='data_flow',
                        message='Sensitive data in response - filter out sensitive fields before returning',
                        line=i,
                        severity='high',
                        rule_id='DATA_SENSITIVE_IN_RESPONSE'
                    ))
            
            # Data flow without encryption
            if any(transmission in line_lower for transmission in [
                'send(', 'transmit', 'upload', 'download', 'http', 'api'
            ]):
                if any(sensitive in line_lower for sensitive in sensitive_patterns):
                    context_lines = lines[max(0, i-5):i+5]
                    if not any(encryption in l.lower() for encryption in [
                        'encrypt', 'ssl', 'tls', 'https', 'secure'
                    ] for l in context_lines):
                        data_flow_issues.append(CodeIssue(
                            type='data_flow',
                            message='Sensitive data transmitted without encryption - use HTTPS/SSL',
                            line=i,
                            severity='high',
                            rule_id='DATA_UNENCRYPTED_TRANSMISSION'
                        ))
            
            # Data persistence without encryption
            if any(storage in line_lower for storage in [
                'save(', 'store(', 'write(', 'insert', 'update', 'database'
            ]):
                if any(sensitive in line_lower for sensitive in sensitive_patterns):
                    context_lines = lines[max(0, i-5):i+5]
                    if not any(encryption in l.lower() for encryption in [
                        'encrypt', 'hash', 'bcrypt', 'secure'
                    ] for l in context_lines):
                        data_flow_issues.append(CodeIssue(
                            type='data_flow',
                            message='Sensitive data stored without encryption - encrypt before storage',
                            line=i,
                            severity='high',
                            rule_id='DATA_UNENCRYPTED_STORAGE'
                        ))
            
            # Data flow to external services without validation
            if any(external in line_lower for external in [
                'requests.post', 'requests.get', 'urllib', 'httpx', 'aiohttp'
            ]):
                context_lines = lines[max(0, i-5):i+5]
                if not any(validation in l.lower() for validation in [
                    'validate', 'sanitize', 'escape', 'whitelist'
                ] for l in context_lines):
                    data_flow_issues.append(CodeIssue(
                        type='data_flow',
                        message='Data sent to external service without validation - validate data before transmission',
                        line=i,
                        severity='medium',
                        rule_id='DATA_EXTERNAL_WITHOUT_VALIDATION'
                    ))
            
            # Data flow from file without validation
            if any(file_pattern in line_lower for file_pattern in [
                'open(', 'read(', 'load(', 'pickle', 'json.load'
            ]):
                context_lines = lines[max(0, i-5):i+5]
                if not any(validation in l.lower() for validation in [
                    'validate', 'sanitize', 'escape', 'verify'
                ] for l in context_lines):
                    data_flow_issues.append(CodeIssue(
                        type='data_flow',
                        message='Data loaded from file without validation - validate file content before processing',
                        line=i,
                        severity='medium',
                        rule_id='DATA_FILE_WITHOUT_VALIDATION'
                    ))
            
            # Data flow to database without sanitization
            if any(db_pattern in line_lower for db_pattern in [
                'execute(', 'query(', 'insert', 'update', 'delete', 'select'
            ]):
                context_lines = lines[max(0, i-5):i+5]
                if not any(sanitization in l.lower() for sanitization in [
                    'sanitize', 'escape', 'parameterize', 'prepared'
                ] for l in context_lines):
                    data_flow_issues.append(CodeIssue(
                        type='data_flow',
                        message='Data sent to database without sanitization - use parameterized queries',
                        line=i,
                        severity='high',
                        rule_id='DATA_DB_WITHOUT_SANITIZATION'
                    ))
            
            # Data flow through global variables
            if 'global ' in line_lower:
                if any(sensitive in line_lower for sensitive in sensitive_patterns):
                    data_flow_issues.append(CodeIssue(
                        type='data_flow',
                        message='Sensitive data stored in global variable - use secure storage mechanisms',
                        line=i,
                        severity='medium',
                        rule_id='DATA_SENSITIVE_GLOBAL'
                    ))
            
            # Data flow through environment variables
            if 'os.environ' in line_lower or 'getenv(' in line_lower:
                if any(sensitive in line_lower for sensitive in sensitive_patterns):
                    data_flow_issues.append(CodeIssue(
                        type='data_flow',
                        message='Sensitive data in environment variable - ensure proper access controls',
                        line=i,
                        severity='medium',
                        rule_id='DATA_SENSITIVE_ENV'
                    ))
            
            # Data flow through temporary files
            if any(temp_pattern in line_lower for temp_pattern in [
                'tempfile', 'tmp', 'temporary', 'temp'
            ]):
                if any(sensitive in line_lower for sensitive in sensitive_patterns):
                    data_flow_issues.append(CodeIssue(
                        type='data_flow',
                        message='Sensitive data in temporary file - ensure proper cleanup and permissions',
                        line=i,
                        severity='medium',
                        rule_id='DATA_SENSITIVE_TEMP'
                    ))
            
            # Data flow through cache without expiration
            if any(cache_pattern in line_lower for cache_pattern in [
                'cache', 'redis', 'memcached', 'store'
            ]):
                if any(sensitive in line_lower for sensitive in sensitive_patterns):
                    context_lines = lines[max(0, i-5):i+5]
                    if not any(expiration in l.lower() for expiration in [
                        'expire', 'ttl', 'timeout', 'max_age'
                    ] for l in context_lines):
                        data_flow_issues.append(CodeIssue(
                            type='data_flow',
                            message='Sensitive data cached without expiration - set appropriate TTL',
                            line=i,
                            severity='medium',
                            rule_id='DATA_SENSITIVE_CACHE_NO_EXPIRY'
                        ))
        
        return data_flow_issues
    
    def _analyze_dependency_vulnerabilities(self, code: str) -> List[CodeIssue]:
        """Analyze code for dependency vulnerabilities and outdated packages"""
        dependency_issues = []
        lines = code.split('\n')
        
        # Common vulnerable packages and patterns
        vulnerable_packages = {
            'requests': ['<2.20.0', 'Known SSRF vulnerabilities'],
            'urllib3': ['<1.24.0', 'Known security vulnerabilities'],
            'pyyaml': ['<5.1', 'YAML deserialization vulnerabilities'],
            'jinja2': ['<2.10.1', 'Template injection vulnerabilities'],
            'django': ['<2.2.0', 'Multiple security vulnerabilities'],
            'flask': ['<1.0.0', 'Security vulnerabilities'],
            'tornado': ['<5.1.0', 'Security vulnerabilities'],
            'cryptography': ['<2.3.0', 'Cryptographic vulnerabilities'],
            'pillow': ['<6.0.0', 'Image processing vulnerabilities'],
            'lxml': ['<4.3.0', 'XML parsing vulnerabilities']
        }
        
        # License compliance issues
        problematic_licenses = [
            'gpl', 'agpl', 'copyleft', 'proprietary', 'commercial'
        ]
        
        # Track import statements and requirements
        imports = []
        requirements = []
        
        for i, line in enumerate(lines, 1):
            line_lower = line.lower().strip()
            
            # Extract import statements
            if line_lower.startswith('import ') or line_lower.startswith('from '):
                # Parse import statement
                if 'import ' in line_lower:
                    package = line_lower.split('import ')[1].split(' ')[0].split('.')[0]
                    imports.append((package, i))
                elif 'from ' in line_lower:
                    package = line_lower.split('from ')[1].split(' ')[0].split('.')[0]
                    imports.append((package, i))
            
            # Check for requirements.txt patterns
            if '==' in line_lower or '>=' in line_lower or '<=' in line_lower:
                if any(req_pattern in line_lower for req_pattern in [
                    'requests', 'urllib', 'django', 'flask', 'numpy', 'pandas'
                ]):
                    requirements.append((line_lower, i))
            
            # Check for vulnerable package usage
            for package, (min_version, reason) in vulnerable_packages.items():
                if package in line_lower:
                    dependency_issues.append(CodeIssue(
                        type='dependency',
                        message=f'Potentially vulnerable package {package} - {reason}',
                        line=i,
                        severity='high',
                        rule_id='DEP_VULNERABLE_PACKAGE'
                    ))
            
            # Check for hardcoded package versions
            if any(version_pattern in line_lower for version_pattern in [
                '==', '>=', '<=', '>', '<'
            ]) and any(package_pattern in line_lower for package_pattern in [
                'import', 'from', 'require', 'install'
            ]):
                dependency_issues.append(CodeIssue(
                    type='dependency',
                    message='Hardcoded package version - consider using version ranges for flexibility',
                    line=i,
                    severity='low',
                    rule_id='DEP_HARDCODED_VERSION'
                ))
            
            # Check for development dependencies in production code
            if any(dev_pattern in line_lower for dev_pattern in [
                'pytest', 'unittest', 'mock', 'coverage', 'black', 'flake8'
            ]) and any(prod_pattern in line_lower for prod_pattern in [
                'import', 'from', 'require'
            ]):
                dependency_issues.append(CodeIssue(
                    type='dependency',
                    message='Development dependency used in production code - separate dev and prod dependencies',
                    line=i,
                    severity='medium',
                    rule_id='DEP_DEV_IN_PROD'
                ))
            
            # Check for license compliance issues
            if any(license_pattern in line_lower for license_pattern in problematic_licenses):
                dependency_issues.append(CodeIssue(
                    type='dependency',
                    message='Potentially problematic license detected - review license compatibility',
                    line=i,
                    severity='medium',
                    rule_id='DEP_LICENSE_ISSUE'
                ))
            
            # Check for missing dependency management
            if any(dep_pattern in line_lower for dep_pattern in [
                'import ', 'from ', 'require('
            ]) and not any(manage_pattern in line_lower for manage_pattern in [
                'requirements.txt', 'setup.py', 'pyproject.toml', 'poetry', 'pipenv'
            ]):
                # Check if this is in a requirements or setup file
                context_lines = lines[max(0, i-5):i+5]
                if not any(manage_file in l.lower() for manage_file in [
                    'requirements', 'setup', 'pyproject', 'poetry', 'pipenv'
                ] for l in context_lines):
                    dependency_issues.append(CodeIssue(
                        type='dependency',
                        message='Missing dependency management - use requirements.txt or similar',
                        line=i,
                        severity='low',
                        rule_id='DEP_MISSING_MANAGEMENT'
                    ))
            
            # Check for outdated package patterns
            if any(outdated_pattern in line_lower for outdated_pattern in [
                'python2', 'python 2', 'six', 'future', 'backports'
            ]):
                dependency_issues.append(CodeIssue(
                    type='dependency',
                    message='Outdated Python 2 compatibility package - migrate to Python 3',
                    line=i,
                    severity='medium',
                    rule_id='DEP_PYTHON2_COMPAT'
                ))
            
            # Check for insecure package sources
            if any(source_pattern in line_lower for source_pattern in [
                '--index-url', '--extra-index-url', '--trusted-host'
            ]):
                if 'http://' in line_lower and 'https://' not in line_lower:
                    dependency_issues.append(CodeIssue(
                        type='dependency',
                        message='Insecure package source - use HTTPS for package downloads',
                        line=i,
                        severity='high',
                        rule_id='DEP_INSECURE_SOURCE'
                    ))
            
            # Check for missing security updates
            if any(update_pattern in line_lower for update_pattern in [
                '--no-deps', '--no-dependencies', '--force-reinstall'
            ]):
                dependency_issues.append(CodeIssue(
                    type='dependency',
                    message='Skipping dependency updates - may miss security patches',
                    line=i,
                    severity='medium',
                    rule_id='DEP_SKIP_UPDATES'
                ))
            
            # Check for package pinning without security updates
            if '==' in line_lower and any(package in line_lower for package in [
                'requests', 'urllib3', 'django', 'flask', 'numpy', 'pandas'
            ]):
                dependency_issues.append(CodeIssue(
                    type='dependency',
                    message='Package pinned to specific version - may miss security updates',
                    line=i,
                    severity='low',
                    rule_id='DEP_PINNED_VERSION'
                ))
        
        # Analyze import patterns for additional issues
        for package, line_num in imports:
            if package in vulnerable_packages:
                min_version, reason = vulnerable_packages[package]
                dependency_issues.append(CodeIssue(
                    type='dependency',
                    message=f'Using potentially vulnerable package {package} - {reason}',
                    line=line_num,
                    severity='high',
                    rule_id='DEP_VULNERABLE_IMPORT'
                ))
        
        return dependency_issues
    
    def _analyze_testing_gaps(self, code: str) -> List[CodeIssue]:
        """Analyze code for testing gaps, untestable code, and test anti-patterns"""
        testing_issues = []
        lines = code.split('\n')
        
        # Track functions and classes that need testing
        functions_to_test = []
        classes_to_test = []
        test_files = []
        
        for i, line in enumerate(lines, 1):
            line_lower = line.lower().strip()
            
            # Identify functions that need testing
            if line_lower.startswith('def ') and not line_lower.startswith('def test_'):
                func_name = line_lower.split('def ')[1].split('(')[0]
                if not any(test_pattern in func_name for test_pattern in ['test', 'mock', 'stub']):
                    functions_to_test.append((func_name, i))
            
            # Identify classes that need testing
            if line_lower.startswith('class ') and not line_lower.startswith('class test'):
                class_name = line_lower.split('class ')[1].split('(')[0].split(':')[0]
                if not any(test_pattern in class_name for test_pattern in ['test', 'mock', 'stub']):
                    classes_to_test.append((class_name, i))
            
            # Check for test files
            if any(test_pattern in line_lower for test_pattern in [
                'test_', 'test.py', 'tests/', 'unittest', 'pytest'
            ]):
                test_files.append(i)
            
            # Check for untestable code patterns
            if any(untestable_pattern in line_lower for untestable_pattern in [
                'input(', 'raw_input(', 'sys.argv', 'os.environ'
            ]):
                testing_issues.append(CodeIssue(
                    type='testing',
                    message='Untestable code - direct user input or system interaction',
                    line=i,
                    severity='medium',
                    rule_id='TEST_UNTESTABLE_CODE'
                ))
            
            # Check for hardcoded values that make testing difficult
            if any(hardcoded_pattern in line_lower for hardcoded_pattern in [
                'localhost', '127.0.0.1', 'http://', 'https://', 'database', 'api'
            ]) and any(assignment in line_lower for assignment in ['=', ':', 'url', 'host']):
                testing_issues.append(CodeIssue(
                    type='testing',
                    message='Hardcoded values make testing difficult - use configuration or dependency injection',
                    line=i,
                    severity='low',
                    rule_id='TEST_HARDCODED_VALUES'
                ))
            
            # Check for missing error handling in testable functions
            if line_lower.startswith('def ') and not line_lower.startswith('def test_'):
                context_lines = lines[i:i+20]  # Next 20 lines
                if not any(error_pattern in l.lower() for error_pattern in [
                    'try:', 'except', 'raise', 'error', 'exception'
                ] for l in context_lines):
                    testing_issues.append(CodeIssue(
                        type='testing',
                        message='Function missing error handling - add try/except blocks for better testability',
                        line=i,
                        severity='low',
                        rule_id='TEST_MISSING_ERROR_HANDLING'
                    ))
            
            # Check for test anti-patterns
            if any(test_anti_pattern in line_lower for test_anti_pattern in [
                'assert true', 'assert false', 'assert 1', 'assert 0'
            ]):
                testing_issues.append(CodeIssue(
                    type='testing',
                    message='Test anti-pattern - use meaningful assertions instead of assert True/False',
                    line=i,
                    severity='medium',
                    rule_id='TEST_ANTI_PATTERN'
                ))
            
            # Check for missing test documentation
            if line_lower.startswith('def test_'):
                context_lines = lines[i:i+5]  # Next 5 lines
                if not any(doc_pattern in l.lower() for doc_pattern in [
                    'docstring', '"""', "'''", 'description', 'test'
                ] for l in context_lines):
                    testing_issues.append(CodeIssue(
                        type='testing',
                        message='Test function missing documentation - add docstring explaining test purpose',
                        line=i,
                        severity='low',
                        rule_id='TEST_MISSING_DOCUMENTATION'
                    ))
            
            # Check for test isolation issues
            if any(isolation_pattern in line_lower for isolation_pattern in [
                'global ', 'class variable', 'module variable'
            ]) and any(test_context in lines[max(0, i-10):i] for test_context in [
                'def test_', 'class test', 'unittest', 'pytest'
            ]):
                testing_issues.append(CodeIssue(
                    type='testing',
                    message='Test isolation issue - avoid global variables in tests',
                    line=i,
                    severity='medium',
                    rule_id='TEST_ISOLATION_ISSUE'
                ))
            
            # Check for missing test setup/teardown
            if any(test_pattern in line_lower for test_pattern in [
                'def test_', 'class test'
            ]):
                context_lines = lines[max(0, i-20):i+20]
                if not any(setup_pattern in l.lower() for setup_pattern in [
                    'setUp', 'tearDown', 'setup_method', 'teardown_method', 'fixture'
                ] for l in context_lines):
                    testing_issues.append(CodeIssue(
                        type='testing',
                        message='Test missing setup/teardown - add proper test lifecycle management',
                        line=i,
                        severity='low',
                        rule_id='TEST_MISSING_SETUP'
                    ))
            
            # Check for test data hardcoding
            if any(test_pattern in line_lower for test_pattern in [
                'def test_', 'assert'
            ]):
                if any(hardcoded_data in line_lower for hardcoded_data in [
                    'user123', 'password', 'test@example.com', 'john doe'
                ]):
                    testing_issues.append(CodeIssue(
                        type='testing',
                        message='Hardcoded test data - use test fixtures or factories',
                        line=i,
                        severity='low',
                        rule_id='TEST_HARDCODED_DATA'
                    ))
            
            # Check for missing test coverage for critical functions
            if any(critical_pattern in line_lower for critical_pattern in [
                'def authenticate', 'def authorize', 'def validate', 'def encrypt', 'def decrypt'
            ]):
                testing_issues.append(CodeIssue(
                    type='testing',
                    message='Critical function needs comprehensive test coverage',
                    line=i,
                    severity='high',
                    rule_id='TEST_CRITICAL_FUNCTION'
                ))
            
            # Check for test performance issues
            if any(perf_pattern in line_lower for perf_pattern in [
                'time.sleep', 'requests.get', 'database.query', 'file.read'
            ]) and any(test_context in lines[max(0, i-10):i] for test_context in [
                'def test_', 'class test'
            ]):
                testing_issues.append(CodeIssue(
                    type='testing',
                    message='Slow test - use mocks or stubs for external dependencies',
                    line=i,
                    severity='medium',
                    rule_id='TEST_PERFORMANCE_ISSUE'
                ))
            
            # Check for missing integration tests
            if any(integration_pattern in line_lower for integration_pattern in [
                'def test_', 'class test'
            ]) and any(integration_context in line_lower for integration_context in [
                'database', 'api', 'http', 'external'
            ]):
                testing_issues.append(CodeIssue(
                    type='testing',
                    message='Integration test needed - test with real external dependencies',
                    line=i,
                    severity='low',
                    rule_id='TEST_MISSING_INTEGRATION'
                ))
        
        # Add issues for functions/classes without tests
        for func_name, line_num in functions_to_test:
            if not any(test_file in lines for test_file in test_files):
                testing_issues.append(CodeIssue(
                    type='testing',
                    message=f'Function {func_name} has no corresponding test - add unit tests',
                    line=line_num,
                    severity='medium',
                    rule_id='TEST_MISSING_FUNCTION_TEST'
                ))
        
        for class_name, line_num in classes_to_test:
            if not any(test_file in lines for test_file in test_files):
                testing_issues.append(CodeIssue(
                    type='testing',
                    message=f'Class {class_name} has no corresponding test - add unit tests',
                    line=line_num,
                    severity='medium',
                    rule_id='TEST_MISSING_CLASS_TEST'
                ))
        
        return testing_issues
    
    def _analyze_algorithm_efficiency(self, code: str) -> List[CodeIssue]:
        """Analyze code for algorithmic efficiency issues and complexity problems"""
        algorithm_issues = []
        lines = code.split('\n')
        
        for i, line in enumerate(lines, 1):
            line_lower = line.lower().strip()
            
            # Detect O(n²) nested loop patterns
            if any(loop_pattern in line_lower for loop_pattern in [
                'for i in range', 'for j in range', 'for k in range'
            ]):
                # Check for nested loops in context
                context_lines = lines[max(0, i-10):i+20]
                nested_loops = 0
                for context_line in context_lines:
                    context_lower = context_line.lower().strip()
                    if any(loop_pattern in context_lower for loop_pattern in [
                        'for i in range', 'for j in range', 'for k in range', 'for x in range', 'for y in range'
                    ]):
                        nested_loops += 1
                
                if nested_loops >= 2:
                    # Check for specific O(n²) patterns
                    context_lines = lines[max(0, i-10):i+20]
                    context_text = ' '.join(context_lines).lower()
                    
                    if any(sort_pattern in context_text for sort_pattern in [
                        'bubble', 'selection', 'insertion', 'sort'
                    ]):
                        algorithm_issues.append(CodeIssue(
                            type='algorithm_efficiency',
                            message='O(n²) sorting algorithm detected - use built-in sorted() for O(n log n) complexity',
                            line=i,
                            severity='high',
                            rule_id='ALG_O2_SORTING'
                        ))
                    elif any(duplicate_pattern in context_text for duplicate_pattern in [
                        'duplicate', 'unique', 'remove', 'find'
                    ]):
                        algorithm_issues.append(CodeIssue(
                            type='algorithm_efficiency',
                            message='O(n²) duplicate detection - use set() for O(n) complexity',
                            line=i,
                            severity='high',
                            rule_id='ALG_O2_DUPLICATE'
                        ))
            
            # Enhanced O(n²) duplicate detection for nested equality checks
            if 'for i in range(len(' in line_lower and 'for j in range(i + 1' in ' '.join(lines[max(0, i-3):i+3]).lower():
                context_lines = lines[max(0, i-5):i+10]
                context_text = ' '.join(context_lines).lower()
                if any(equality_pattern in context_text for equality_pattern in [
                    '==', 'if.*==', 'numbers[i] == numbers[j]'
                ]) and any(membership_pattern in context_text for membership_pattern in [
                    'not in', 'in duplicates', 'in seen'
                ]):
                    algorithm_issues.append(CodeIssue(
                        type='algorithm_efficiency',
                        message='O(n²) duplicate search via nested loops - use set-based detection for O(n) complexity',
                        line=i,
                        severity='high',
                        rule_id='ALG_NESTED_EQUALITY_DUPSCAN'
                    ))
                else:
                    algorithm_issues.append(CodeIssue(
                        type='algorithm_efficiency',
                        message='O(n²) nested loop pattern detected - consider optimization',
                        line=i,
                        severity='medium',
                        rule_id='ALG_O2_NESTED_LOOP'
                    ))
            
            # Detect exponential time complexity (recursive patterns)
            if any(recursive_pattern in line_lower for recursive_pattern in [
                'fibonacci', 'recursive', 'return'
            ]):
                context_lines = lines[max(0, i-5):i+10]
                context_text = ' '.join(context_lines).lower()
                
                # Check for recursive calls with n-1, n-2 patterns
                if any(exp_pattern in context_text for exp_pattern in [
                    'fibonacci', 'recursive'
                ]) and any(exp_call in context_text for exp_call in [
                    'n-1', 'n-2', 'n-3'
                ]):
                    algorithm_issues.append(CodeIssue(
                        type='algorithm_efficiency',
                        message='Exponential time complexity O(2^n) detected - use memoization or iterative approach',
                        line=i,
                        severity='critical',
                        rule_id='ALG_EXPONENTIAL'
                    ))
                # Check for direct recursive calls
                elif 'return' in context_text and any(exp_call in context_text for exp_call in [
                    'n-1', 'n-2', 'n-3'
                ]) and any(func_call in context_text for func_call in [
                    '(', 'fibonacci', 'recursive'
                ]):
                    algorithm_issues.append(CodeIssue(
                        type='algorithm_efficiency',
                        message='Exponential time complexity O(2^n) detected - use memoization or iterative approach',
                        line=i,
                        severity='critical',
                        rule_id='ALG_EXPONENTIAL'
                    ))
            
            # Enhanced exponential recursion detection for function definitions
            if 'def ' in line_lower and any(func_pattern in line_lower for func_pattern in [
                'fibonacci', 'recursive'
            ]):
                # Look ahead for the function body
                context_lines = lines[i:i+20]  # Next 20 lines
                context_text = ' '.join(context_lines).lower()
                if any(exp_call in context_text for exp_call in [
                    'n-1', 'n-2', 'n-3'
                ]) and any(recursive_call in context_text for recursive_call in [
                    'fibonacci', 'recursive'
                ]) and 'return' in context_text:
                    algorithm_issues.append(CodeIssue(
                        type='algorithm_efficiency',
                        message='Exponential recursion detected - use @lru_cache or iterative DP for O(n) complexity',
                        line=i,
                        severity='critical',
                        rule_id='ALG_EXPONENTIAL_RECURSION'
                    ))
            
            # Additional check for exponential patterns in function definitions
            if 'def ' in line_lower and any(func_pattern in line_lower for func_pattern in [
                'fibonacci', 'recursive'
            ]):
                context_lines = lines[i:i+15]  # Next 15 lines
                context_text = ' '.join(context_lines).lower()
                if any(exp_call in context_text for exp_call in [
                    'n-1', 'n-2', 'n-3'
                ]) and any(recursive_call in context_text for recursive_call in [
                    'fibonacci', 'recursive'
                ]):
                    algorithm_issues.append(CodeIssue(
                        type='algorithm_efficiency',
                        message='Exponential time complexity O(2^n) detected - use memoization or iterative approach',
                        line=i,
                        severity='critical',
                        rule_id='ALG_EXPONENTIAL'
                    ))
            
            # Detect inefficient data structure usage
            if any(linear_search in line_lower for linear_search in [
                'for.*in.*enumerate', 'for.*in.*range.*len', 'for i, item in enumerate'
            ]):
                context_lines = lines[max(0, i-5):i+10]
                context_text = ' '.join(context_lines).lower()
                if any(search_pattern in context_text for search_pattern in [
                    'if.*==', 'if.*in', 'find', 'search', 'target'
                ]):
                    algorithm_issues.append(CodeIssue(
                        type='algorithm_efficiency',
                        message='Linear search O(n) detected - consider binary search O(log n) for sorted data',
                        line=i,
                        severity='medium',
                        rule_id='ALG_LINEAR_SEARCH'
                    ))
            
            # Detect inefficient list operations
            if any(concat_pattern in line_lower for concat_pattern in [
                'result.*=.*result.*+', 'list.*=.*list.*+', 'data.*=.*data.*+', 'result = result +', 'result[key] = result[key] + ['
            ]):
                # Check if this is inside a loop
                context_lines = lines[max(0, i-10):i+5]
                context_text = ' '.join(context_lines).lower()
                if any(loop_context in context_text for loop_context in [
                    'for ', 'while ', 'loop'
                ]):
                    algorithm_issues.append(CodeIssue(
                        type='algorithm_efficiency',
                        message='List concatenation in loop reallocates each time - use append() or extend() for O(1) amortized',
                        line=i,
                        severity='medium',
                        rule_id='PERF_LIST_CONCAT_IN_LOOP'
                    ))
                else:
                    algorithm_issues.append(CodeIssue(
                        type='algorithm_efficiency',
                        message='Inefficient list concatenation - creates new list each time O(n)',
                        line=i,
                        severity='medium',
                        rule_id='ALG_INEFFICIENT_CONCAT'
                    ))
            
            # Detect manual grouping patterns (dict.setdefault or if key not in dict)
            if any(grouping_pattern in line_lower for grouping_pattern in [
                'if.*not in.*:', 'setdefault', 'if.*not in.*dict', 'if category not in'
            ]):
                context_lines = lines[max(0, i-3):i+3]
                context_text = ' '.join(context_lines).lower()
                if any(grouping_context in context_text for grouping_context in [
                    'append', 'list', '[]', 'grouped'
                ]):
                    algorithm_issues.append(CodeIssue(
                        type='algorithm_efficiency',
                        message='Manual grouping pattern detected - use collections.defaultdict(list) for better performance',
                        line=i,
                        severity='medium',
                        rule_id='ALG_MANUAL_GROUPING'
                    ))
            
            # Detect manual sorting when built-ins exist
            if any(manual_sort in line_lower for manual_sort in [
                'bubble', 'selection', 'insertion', 'quick', 'merge'
            ]) and any(sort_context in line_lower for sort_context in [
                'sort', 'order', 'arrange'
            ]):
                algorithm_issues.append(CodeIssue(
                    type='algorithm_efficiency',
                    message='Manual sorting algorithm - use built-in sorted() or list.sort() for better performance',
                    line=i,
                    severity='high',
                    rule_id='ALG_MANUAL_SORT'
                ))
            
            # Detect inefficient string operations
            if any(string_pattern in line_lower for string_pattern in [
                'string.*+', 'str.*+', 'text.*+'
            ]):
                if any(loop_context in lines[max(0, i-10):i] for loop_context in [
                    'for ', 'while ', 'loop'
                ]):
                    algorithm_issues.append(CodeIssue(
                        type='algorithm_efficiency',
                        message='String concatenation in loop - use join() for O(n) instead of O(n²)',
                        line=i,
                        severity='medium',
                        rule_id='ALG_STRING_CONCAT'
                    ))
            
            # Detect inefficient dictionary operations
            if any(dict_pattern in line_lower for dict_pattern in [
                'dict.*get', 'dictionary.*get', 'key.*in.*dict'
            ]):
                context_lines = lines[max(0, i-5):i+5]
                if any(loop_context in l.lower() for loop_context in [
                    'for ', 'while '
                ] for l in context_lines):
                    algorithm_issues.append(CodeIssue(
                        type='algorithm_efficiency',
                        message='Dictionary lookup in loop - consider pre-computing or using defaultdict',
                        line=i,
                        severity='low',
                        rule_id='ALG_DICT_LOOKUP'
                    ))
            
            # Detect inefficient list comprehensions
            if any(comp_pattern in line_lower for comp_pattern in [
                'for.*in.*for.*in', 'nested.*comprehension'
            ]):
                algorithm_issues.append(CodeIssue(
                    type='algorithm_efficiency',
                    message='Nested list comprehension - consider flattening or using itertools',
                    line=i,
                    severity='low',
                    rule_id='ALG_NESTED_COMPREHENSION'
                ))
            
            # Detect inefficient file operations
            if any(file_pattern in line_lower for file_pattern in [
                'readline', 'readlines', 'file.read'
            ]):
                context_lines = lines[max(0, i-5):i+5]
                if any(loop_context in l.lower() for loop_context in [
                    'for ', 'while '
                ] for l in context_lines):
                    algorithm_issues.append(CodeIssue(
                        type='algorithm_efficiency',
                        message='File reading in loop - read entire file once for better performance',
                        line=i,
                        severity='medium',
                        rule_id='ALG_FILE_READ'
                    ))
            
            # Detect inefficient database operations
            if any(db_pattern in line_lower for db_pattern in [
                'query', 'select', 'insert', 'update', 'delete'
            ]):
                context_lines = lines[max(0, i-5):i+5]
                if any(loop_context in l.lower() for loop_context in [
                    'for ', 'while '
                ] for l in context_lines):
                    algorithm_issues.append(CodeIssue(
                        type='algorithm_efficiency',
                        message='Database query in loop - use bulk operations or joins',
                        line=i,
                        severity='high',
                        rule_id='ALG_DB_QUERY'
                    ))
            
            # Detect inefficient network operations
            if any(network_pattern in line_lower for network_pattern in [
                'requests.get', 'requests.post', 'urllib', 'http'
            ]):
                context_lines = lines[max(0, i-5):i+5]
                if any(loop_context in l.lower() for loop_context in [
                    'for ', 'while '
                ] for l in context_lines):
                    algorithm_issues.append(CodeIssue(
                        type='algorithm_efficiency',
                        message='Network request in loop - use connection pooling or async requests',
                        line=i,
                        severity='high',
                        rule_id='ALG_NETWORK_REQUEST'
                    ))
            
            # Detect inefficient memory usage patterns
            if any(memory_pattern in line_lower for memory_pattern in [
                'copy', 'deepcopy', 'clone'
            ]):
                context_lines = lines[max(0, i-5):i+5]
                if any(loop_context in l.lower() for loop_context in [
                    'for ', 'while '
                ] for l in context_lines):
                    algorithm_issues.append(CodeIssue(
                        type='algorithm_efficiency',
                        message='Object copying in loop - consider reusing objects or shallow copies',
                        line=i,
                        severity='medium',
                        rule_id='ALG_OBJECT_COPY'
                    ))
            
            # Detect inefficient regex operations
            if any(regex_pattern in line_lower for regex_pattern in [
                're.compile', 're.search', 're.match', 're.findall'
            ]):
                context_lines = lines[max(0, i-5):i+5]
                if any(loop_context in l.lower() for loop_context in [
                    'for ', 'while '
                ] for l in context_lines):
                    algorithm_issues.append(CodeIssue(
                        type='algorithm_efficiency',
                        message='Regex compilation in loop - compile pattern once outside loop',
                        line=i,
                        severity='medium',
                        rule_id='ALG_REGEX_COMPILE'
                    ))
        
        return algorithm_issues
    
    def _analyze_memory_issues(self, code: str) -> List[CodeIssue]:
        """Analyze code for memory leaks and management issues"""
        memory_issues = []
        lines = code.split('\n')
        
        # Track variables that grow unboundedly
        growing_variables = set()
        cache_variables = set()
        global_variables = set()
        file_handles = set()
        resource_handles = set()
        
        for i, line in enumerate(lines, 1):
            line_lower = line.lower().strip()
            
            # Detect unbounded cache growth
            if 'self.cache' in line_lower and '=' in line and '{}' in line:
                memory_issues.append(CodeIssue(
                    type='memory_leak',
                    message='Unbounded cache growth - self.cache never gets cleared',
                    line=i,
                    severity='high',
                    rule_id='MEM_CACHE_GROWTH'
                ))
                cache_variables.add('self.cache')
            
            # Detect event handler accumulation
            if '.append(handler)' in line_lower or '.append(event_handler)' in line_lower:
                if 'self.event_handlers' in line_lower or 'event_handlers' in line_lower:
                    memory_issues.append(CodeIssue(
                        type='memory_leak',
                        message='Event handlers accumulate without cleanup - potential memory leak',
                        line=i,
                        severity='high',
                        rule_id='MEM_EVENT_HANDLERS'
                    ))
            
            # Detect large dataset accumulation
            if '.append(processed_data)' in line_lower or '.append(large_data)' in line_lower:
                if 'self.large_datasets' in line_lower or 'large_datasets' in line_lower:
                    memory_issues.append(CodeIssue(
                        type='memory_leak',
                        message='Large datasets accumulate without cleanup - memory leak risk',
                        line=i,
                        severity='high',
                        rule_id='MEM_LARGE_DATASETS'
                    ))
            
            # Detect global variable growth
            if line_lower.startswith('global_') and ('=' in line or '.append(' in line):
                var_name = line_lower.split()[0] if line_lower.split() else ''
                if var_name not in global_variables:
                    global_variables.add(var_name)
                    memory_issues.append(CodeIssue(
                        type='memory_leak',
                        message=f'Global variable {var_name} grows without bounds - memory leak risk',
                        line=i,
                        severity='high',
                        rule_id='MEM_GLOBAL_GROWTH'
                    ))
            
            # Detect large object creation in loops
            if 'range(1000000)' in line_lower or 'range(100000)' in line_lower:
                memory_issues.append(CodeIssue(
                    type='performance_issue',
                    message='Creating large arrays repeatedly - consider caching or reusing',
                    line=i,
                    severity='medium',
                    rule_id='MEM_LARGE_OBJECTS'
                ))
            
            # Detect closure memory capture
            if 'lambda' in line_lower and ('self.' in line_lower or 'large_' in line_lower):
                memory_issues.append(CodeIssue(
                    type='memory_leak',
                    message='Lambda captures large objects preventing garbage collection',
                    line=i,
                    severity='medium',
                    rule_id='MEM_CLOSURE_CAPTURE'
                ))
            
            # Detect missing cache size limits
            if 'cache' in line_lower and '=' in line and '{}' in line:
                # Check if there's any size limit or TTL mechanism
                has_size_limit = any('maxsize' in l.lower() or 'size' in l.lower() or 'limit' in l.lower() 
                                   for l in lines[max(0, i-5):i+5])
                if not has_size_limit:
                    memory_issues.append(CodeIssue(
                        type='memory_leak',
                        message='Cache without size limits - implement LRU cache with maxsize or TTL',
                        line=i,
                        severity='high',
                        rule_id='MEM_CACHE_NO_LIMITS'
                    ))
            
            # NEW: Detect list.append() without cleanup patterns
            if '.append(' in line_lower:
                # Check for common problematic patterns
                if any(pattern in line_lower for pattern in [
                    'temp_storage.append', 'request_history.append', 'file_handles.append',
                    'background_tasks.append', 'backup_storage.append', 'processing_caches.append',
                    'user_sessions[', 'instances.append'
                ]):
                    memory_issues.append(CodeIssue(
                        type='memory_leak',
                        message='List append without cleanup - data accumulates indefinitely',
                        line=i,
                        severity='high',
                        rule_id='MEM_LIST_ACCUMULATION'
                    ))
            
            # NEW: Detect file handle leaks
            if 'open(' in line_lower and '=' in line:
                # Extract variable name
                var_name = line.split('=')[0].strip()
                file_handles.add(var_name)
                # Check if there's a corresponding close() in nearby lines
                has_close = any(f'{var_name}.close()' in l.lower() or 'close()' in l.lower() 
                               for l in lines[i:i+10])
                if not has_close:
                    memory_issues.append(CodeIssue(
                        type='memory_leak',
                        message=f'File handle {var_name} opened but never closed - resource leak',
                        line=i,
                        severity='high',
                        rule_id='MEM_FILE_HANDLE_LEAK'
                    ))
            
            # NEW: Detect circular references
            if 'self.parent = self' in line_lower or 'self.ref = self' in line_lower:
                memory_issues.append(CodeIssue(
                    type='memory_leak',
                    message='Circular reference detected - prevents garbage collection',
                    line=i,
                    severity='high',
                    rule_id='MEM_CIRCULAR_REFERENCE'
                ))
            
            # NEW: Detect session accumulation
            if 'user_sessions[' in line_lower and '=' in line:
                memory_issues.append(CodeIssue(
                    type='memory_leak',
                    message='User sessions accumulate without cleanup - implement session expiration',
                    line=i,
                    severity='high',
                    rule_id='MEM_SESSION_ACCUMULATION'
                ))
            
            # NEW: Detect instance collection patterns
            if '.instances.append(self)' in line_lower or 'instances.append(self)' in line_lower:
                memory_issues.append(CodeIssue(
                    type='memory_leak',
                    message='All class instances stored in list - prevents garbage collection',
                    line=i,
                    severity='high',
                    rule_id='MEM_INSTANCE_COLLECTION'
                ))
            
            # NEW: Detect temporary storage that's permanent
            if 'temp_storage' in line_lower and '.append(' in line_lower:
                memory_issues.append(CodeIssue(
                    type='memory_leak',
                    message='Temporary storage never cleared - data accumulates permanently',
                    line=i,
                    severity='high',
                    rule_id='MEM_TEMP_STORAGE_LEAK'
                ))
            
            # NEW: Detect request history growth
            if 'request_history' in line_lower and '.append(' in line_lower:
                memory_issues.append(CodeIssue(
                    type='memory_leak',
                    message='Request history grows indefinitely - implement rotation or limits',
                    line=i,
                    severity='medium',
                    rule_id='MEM_REQUEST_HISTORY_GROWTH'
                ))
            
            # NEW: Detect background task accumulation
            if 'background_tasks' in line_lower and '.append(' in line_lower:
                memory_issues.append(CodeIssue(
                    type='memory_leak',
                    message='Background tasks accumulate without cleanup - memory leak risk',
                    line=i,
                    severity='high',
                    rule_id='MEM_BACKGROUND_TASK_ACCUMULATION'
                ))
        
        return memory_issues
    
    def _analyze_code_smells(self, code: str) -> List[CodeIssue]:
        """Analyze code for common code smells"""
        code_smell_issues = []
        lines = code.split('\n')
        
        for i, line in enumerate(lines, 1):
            line_lower = line.lower().strip()
            
            # God Object Detection (too many responsibilities)
            if 'class ' in line_lower and 'def ' in line_lower:
                # Count methods in the class (simplified check)
                class_methods = 0
                for j in range(i, min(i+50, len(lines))):
                    if 'def ' in lines[j].lower() and not lines[j].strip().startswith('#'):
                        class_methods += 1
                    if 'class ' in lines[j].lower() and j > i:
                        break
                
                if class_methods > 15:
                    code_smell_issues.append(CodeIssue(
                        type='code_smell',
                        message=f'God object detected - class has {class_methods} methods, consider splitting responsibilities',
                        line=i,
                        severity='medium',
                        rule_id='SMELL_GOD_OBJECT'
                    ))
            
            # Long Parameter List
            if 'def ' in line_lower and line.count(',') > 5:
                code_smell_issues.append(CodeIssue(
                    type='code_smell',
                    message='Long parameter list - consider using data classes or configuration objects',
                    line=i,
                    severity='medium',
                    rule_id='SMELL_LONG_PARAMETER_LIST'
                ))
            
            # Magic Numbers
            if re.search(r'\b\d{3,}\b', line) and not any(pattern in line_lower for pattern in [
                'version', 'port', 'timeout', 'size', 'limit', 'count'
            ]):
                code_smell_issues.append(CodeIssue(
                    type='code_smell',
                    message='Magic number detected - use named constants for better readability',
                    line=i,
                    severity='low',
                    rule_id='SMELL_MAGIC_NUMBER'
                ))
            
            # Complex Conditional
            if line.count('and ') + line.count('or ') > 3:
                code_smell_issues.append(CodeIssue(
                    type='code_smell',
                    message='Complex conditional - consider extracting to separate methods or using early returns',
                    line=i,
                    severity='medium',
                    rule_id='SMELL_COMPLEX_CONDITIONAL'
                ))
            
            # Duplicate Code Detection (simplified)
            if line.strip() and not line.strip().startswith('#'):
                # Check for similar lines in the code
                similar_lines = [l for l in lines if l.strip() == line.strip() and l != line]
                if len(similar_lines) > 2:
                    code_smell_issues.append(CodeIssue(
                        type='code_smell',
                        message='Potential duplicate code - consider extracting to a common function',
                        line=i,
                        severity='low',
                        rule_id='SMELL_DUPLICATE_CODE'
                    ))
            
            # Long Method Detection
            if 'def ' in line_lower:
                # Count lines in the method (simplified)
                method_lines = 0
                for j in range(i+1, min(i+100, len(lines))):
                    if lines[j].strip() and not lines[j].startswith('    '):
                        break
                    if lines[j].strip() and not lines[j].startswith('#'):
                        method_lines += 1
                
                if method_lines > 30:
                    code_smell_issues.append(CodeIssue(
                        type='code_smell',
                        message=f'Long method detected - {method_lines} lines, consider breaking into smaller functions',
                        line=i,
                        severity='medium',
                        rule_id='SMELL_LONG_METHOD'
                    ))
            
            # Dead Code Detection
            if 'def ' in line_lower and 'unused' in line_lower:
                code_smell_issues.append(CodeIssue(
                    type='code_smell',
                    message='Unused function detected - remove dead code to improve maintainability',
                    line=i,
                    severity='low',
                    rule_id='SMELL_DEAD_CODE'
                ))
            
            # Inconsistent Naming
            if 'def ' in line_lower:
                func_name = line.split('def ')[1].split('(')[0]
                if '_' in func_name and any(c.isupper() for c in func_name):
                    code_smell_issues.append(CodeIssue(
                        type='code_smell',
                        message='Inconsistent naming convention - use snake_case consistently',
                        line=i,
                        severity='low',
                        rule_id='SMELL_INCONSISTENT_NAMING'
                    ))
        
        return code_smell_issues
    
    def _generate_code_smell_suggestions(self, code_smell_issues: List[CodeIssue]) -> List[str]:
        """Generate code smell improvement suggestions"""
        suggestions = []
        
        if any(issue.rule_id == 'SMELL_GOD_OBJECT' for issue in code_smell_issues):
            suggestions.append("Split god objects into smaller, focused classes with single responsibilities")
        
        if any(issue.rule_id == 'SMELL_LONG_PARAMETER_LIST' for issue in code_smell_issues):
            suggestions.append("Use data classes, configuration objects, or builder pattern for long parameter lists")
        
        if any(issue.rule_id == 'SMELL_MAGIC_NUMBER' for issue in code_smell_issues):
            suggestions.append("Replace magic numbers with named constants for better readability and maintainability")
        
        if any(issue.rule_id == 'SMELL_COMPLEX_CONDITIONAL' for issue in code_smell_issues):
            suggestions.append("Extract complex conditionals into separate methods or use early returns")
        
        if any(issue.rule_id == 'SMELL_DUPLICATE_CODE' for issue in code_smell_issues):
            suggestions.append("Extract duplicate code into common functions or utility classes")
        
        if any(issue.rule_id == 'SMELL_LONG_METHOD' for issue in code_smell_issues):
            suggestions.append("Break long methods into smaller, focused functions")
        
        if any(issue.rule_id == 'SMELL_DEAD_CODE' for issue in code_smell_issues):
            suggestions.append("Remove unused code to improve maintainability and reduce complexity")
        
        if any(issue.rule_id == 'SMELL_INCONSISTENT_NAMING' for issue in code_smell_issues):
            suggestions.append("Use consistent naming conventions throughout the codebase")
        
        return suggestions
    
    def _generate_async_suggestions(self, async_issues: List[CodeIssue]) -> List[str]:
        """Generate async/await improvement suggestions"""
        suggestions = []
        
        if any(issue.rule_id == 'ASYNC_BLOCKING_SLEEP' for issue in async_issues):
            suggestions.append("Replace time.sleep() with await asyncio.sleep() in async functions")
        
        if any(issue.rule_id == 'ASYNC_SEQUENTIAL_OPERATIONS' for issue in async_issues):
            suggestions.append("Use asyncio.gather() to run async operations concurrently instead of sequentially")
        
        if any(issue.rule_id == 'ASYNC_SESSION_CREATION' for issue in async_issues):
            suggestions.append("Create aiohttp.ClientSession once and reuse across requests for better performance")
        
        if any(issue.rule_id == 'ASYNC_GATHER_NO_EXCEPTIONS' for issue in async_issues):
            suggestions.append("Add return_exceptions=True to asyncio.gather() to handle individual task failures")
        
        if any(issue.rule_id == 'ASYNC_CPU_BOUND_WORK' for issue in async_issues):
            suggestions.append("Use asyncio.create_task() or run_in_executor() for CPU-bound work in async functions")
        
        if any(issue.rule_id == 'ASYNC_MISSING_AWAIT' for issue in async_issues):
            suggestions.append("Add await keyword when calling async functions to avoid returning coroutine objects")
        
        if any(issue.rule_id == 'ASYNC_BLOCKING_IO' for issue in async_issues):
            suggestions.append("Use async alternatives (aiohttp, aiofiles) instead of blocking I/O in async functions")
        
        if any(issue.rule_id == 'ASYNC_RACE_CONDITION' for issue in async_issues):
            suggestions.append("Use asyncio.Lock() or other synchronization primitives to prevent race conditions")
        
        if any(issue.rule_id == 'ASYNC_LOCK_WITHOUT_CONTEXT' for issue in async_issues):
            suggestions.append("Use async with statement for asyncio locks to prevent deadlocks")
        
        return suggestions
    
    def _generate_api_suggestions(self, api_issues: List[CodeIssue]) -> List[str]:
        """Generate API design improvement suggestions"""
        suggestions = []
        
        if any(issue.rule_id == 'API_GET_MUTATION' for issue in api_issues):
            suggestions.append("Use proper HTTP methods - GET for reading, POST/PUT/DELETE for mutations")
        
        if any(issue.rule_id == 'API_MISSING_ERROR_HANDLING' for issue in api_issues):
            suggestions.append("Add comprehensive error handling with try/except blocks and proper HTTP status codes")
        
        if any(issue.rule_id == 'API_VERB_IN_URL' for issue in api_issues):
            suggestions.append("Use resource-based URLs instead of HTTP verbs in endpoint paths")
        
        if any(issue.rule_id == 'API_INCONSISTENT_NAMING' for issue in api_issues):
            suggestions.append("Use consistent URL naming conventions (kebab-case or camelCase)")
        
        if any(issue.rule_id == 'API_MISSING_VERSIONING' for issue in api_issues):
            suggestions.append("Implement API versioning with /v1/, /v2/ prefixes for backward compatibility")
        
        if any(issue.rule_id == 'API_MISSING_VALIDATION' for issue in api_issues):
            suggestions.append("Add input validation using Pydantic, Marshmallow, or similar schema validation")
        
        if any(issue.rule_id == 'API_MISSING_AUTH' for issue in api_issues):
            suggestions.append("Implement authentication and authorization using JWT, OAuth, or similar mechanisms")
        
        if any(issue.rule_id == 'API_MISSING_RATE_LIMITING' for issue in api_issues):
            suggestions.append("Add rate limiting to prevent API abuse and ensure fair usage")
        
        if any(issue.rule_id == 'API_MISSING_CORS' for issue in api_issues):
            suggestions.append("Configure CORS headers for cross-origin requests")
        
        if any(issue.rule_id == 'API_MISSING_HEADERS' for issue in api_issues):
            suggestions.append("Set proper response headers including Content-Type and custom headers")
        
        if any(issue.rule_id == 'API_MISSING_PAGINATION' for issue in api_issues):
            suggestions.append("Implement pagination for list endpoints to handle large datasets efficiently")
        
        if any(issue.rule_id == 'API_MISSING_DOCUMENTATION' for issue in api_issues):
            suggestions.append("Add comprehensive API documentation using OpenAPI/Swagger or docstrings")
        
        return suggestions
    
    def _generate_data_flow_suggestions(self, data_flow_issues: List[CodeIssue]) -> List[str]:
        """Generate data flow improvement suggestions"""
        suggestions = []
        
        if any(issue.rule_id == 'DATA_SENSITIVE_IN_LOGS' for issue in data_flow_issues):
            suggestions.append("Remove or mask sensitive data from logs - use logging filters or data masking")
        
        if any(issue.rule_id == 'DATA_UNVALIDATED_INPUT' for issue in data_flow_issues):
            suggestions.append("Add input validation and sanitization for all external data sources")
        
        if any(issue.rule_id == 'DATA_SENSITIVE_IN_RESPONSE' for issue in data_flow_issues):
            suggestions.append("Filter out sensitive fields from API responses - use response serializers")
        
        if any(issue.rule_id == 'DATA_UNENCRYPTED_TRANSMISSION' for issue in data_flow_issues):
            suggestions.append("Use HTTPS/SSL for all data transmission - encrypt sensitive data in transit")
        
        if any(issue.rule_id == 'DATA_UNENCRYPTED_STORAGE' for issue in data_flow_issues):
            suggestions.append("Encrypt sensitive data before storage - use proper encryption algorithms")
        
        if any(issue.rule_id == 'DATA_EXTERNAL_WITHOUT_VALIDATION' for issue in data_flow_issues):
            suggestions.append("Validate data before sending to external services - implement data whitelisting")
        
        if any(issue.rule_id == 'DATA_FILE_WITHOUT_VALIDATION' for issue in data_flow_issues):
            suggestions.append("Validate file content before processing - check file types and content integrity")
        
        if any(issue.rule_id == 'DATA_DB_WITHOUT_SANITIZATION' for issue in data_flow_issues):
            suggestions.append("Use parameterized queries and input sanitization for database operations")
        
        if any(issue.rule_id == 'DATA_SENSITIVE_GLOBAL' for issue in data_flow_issues):
            suggestions.append("Use secure storage mechanisms instead of global variables for sensitive data")
        
        if any(issue.rule_id == 'DATA_SENSITIVE_ENV' for issue in data_flow_issues):
            suggestions.append("Ensure proper access controls for environment variables containing sensitive data")
        
        if any(issue.rule_id == 'DATA_SENSITIVE_TEMP' for issue in data_flow_issues):
            suggestions.append("Ensure proper cleanup and permissions for temporary files with sensitive data")
        
        if any(issue.rule_id == 'DATA_SENSITIVE_CACHE_NO_EXPIRY' for issue in data_flow_issues):
            suggestions.append("Set appropriate TTL for cached sensitive data - implement cache expiration")
        
        return suggestions
    
    def _generate_dependency_suggestions(self, dependency_issues: List[CodeIssue]) -> List[str]:
        """Generate dependency management improvement suggestions"""
        suggestions = []
        
        if any(issue.rule_id == 'DEP_VULNERABLE_PACKAGE' for issue in dependency_issues):
            suggestions.append("Update vulnerable packages to latest secure versions - check CVE database")
        
        if any(issue.rule_id == 'DEP_VULNERABLE_IMPORT' for issue in dependency_issues):
            suggestions.append("Review and update vulnerable package imports - use security scanning tools")
        
        if any(issue.rule_id == 'DEP_HARDCODED_VERSION' for issue in dependency_issues):
            suggestions.append("Use version ranges instead of hardcoded versions for better flexibility")
        
        if any(issue.rule_id == 'DEP_DEV_IN_PROD' for issue in dependency_issues):
            suggestions.append("Separate development and production dependencies - use requirements-dev.txt")
        
        if any(issue.rule_id == 'DEP_LICENSE_ISSUE' for issue in dependency_issues):
            suggestions.append("Review package licenses for compliance - use license scanning tools")
        
        if any(issue.rule_id == 'DEP_MISSING_MANAGEMENT' for issue in dependency_issues):
            suggestions.append("Implement proper dependency management with requirements.txt or pyproject.toml")
        
        if any(issue.rule_id == 'DEP_PYTHON2_COMPAT' for issue in dependency_issues):
            suggestions.append("Migrate from Python 2 compatibility packages to Python 3 native alternatives")
        
        if any(issue.rule_id == 'DEP_INSECURE_SOURCE' for issue in dependency_issues):
            suggestions.append("Use HTTPS package sources and verify package integrity")
        
        if any(issue.rule_id == 'DEP_SKIP_UPDATES' for issue in dependency_issues):
            suggestions.append("Enable automatic security updates and dependency scanning")
        
        if any(issue.rule_id == 'DEP_PINNED_VERSION' for issue in dependency_issues):
            suggestions.append("Use version ranges for security updates while maintaining stability")
        
        return suggestions
    
    def _generate_testing_suggestions(self, testing_issues: List[CodeIssue]) -> List[str]:
        """Generate testing improvement suggestions"""
        suggestions = []
        
        if any(issue.rule_id == 'TEST_UNTESTABLE_CODE' for issue in testing_issues):
            suggestions.append("Make code testable by using dependency injection and configuration")
        
        if any(issue.rule_id == 'TEST_HARDCODED_VALUES' for issue in testing_issues):
            suggestions.append("Replace hardcoded values with configuration or environment variables")
        
        if any(issue.rule_id == 'TEST_MISSING_ERROR_HANDLING' for issue in testing_issues):
            suggestions.append("Add error handling to functions for better testability")
        
        if any(issue.rule_id == 'TEST_ANTI_PATTERN' for issue in testing_issues):
            suggestions.append("Use meaningful assertions instead of assert True/False")
        
        if any(issue.rule_id == 'TEST_MISSING_DOCUMENTATION' for issue in testing_issues):
            suggestions.append("Add docstrings to test functions explaining their purpose")
        
        if any(issue.rule_id == 'TEST_ISOLATION_ISSUE' for issue in testing_issues):
            suggestions.append("Avoid global variables in tests - use proper test isolation")
        
        if any(issue.rule_id == 'TEST_MISSING_SETUP' for issue in testing_issues):
            suggestions.append("Add proper test setup and teardown methods")
        
        if any(issue.rule_id == 'TEST_HARDCODED_DATA' for issue in testing_issues):
            suggestions.append("Use test fixtures or factories instead of hardcoded test data")
        
        if any(issue.rule_id == 'TEST_CRITICAL_FUNCTION' for issue in testing_issues):
            suggestions.append("Add comprehensive test coverage for critical functions")
        
        if any(issue.rule_id == 'TEST_PERFORMANCE_ISSUE' for issue in testing_issues):
            suggestions.append("Use mocks or stubs for external dependencies in tests")
        
        if any(issue.rule_id == 'TEST_MISSING_INTEGRATION' for issue in testing_issues):
            suggestions.append("Add integration tests for external dependencies")
        
        if any(issue.rule_id == 'TEST_MISSING_FUNCTION_TEST' for issue in testing_issues):
            suggestions.append("Add unit tests for all functions")
        
        if any(issue.rule_id == 'TEST_MISSING_CLASS_TEST' for issue in testing_issues):
            suggestions.append("Add unit tests for all classes")
        
        return suggestions
    
    def _generate_algorithm_suggestions(self, algorithm_issues: List[CodeIssue]) -> List[str]:
        """Generate algorithm efficiency improvement suggestions"""
        suggestions = []
        
        if any(issue.rule_id == 'ALG_EXPONENTIAL' for issue in algorithm_issues):
            suggestions.append("Use memoization (@lru_cache) or iterative approach to avoid exponential time complexity")
        
        if any(issue.rule_id == 'ALG_O2_SORTING' for issue in algorithm_issues):
            suggestions.append("Replace manual sorting algorithms with built-in sorted() for O(n log n) complexity")
        
        if any(issue.rule_id == 'ALG_O2_DUPLICATE' for issue in algorithm_issues):
            suggestions.append("Use set() for duplicate detection instead of nested loops for O(n) complexity")
        
        if any(issue.rule_id == 'ALG_O2_NESTED_LOOP' for issue in algorithm_issues):
            suggestions.append("Optimize nested loops - consider using built-in functions or data structures")
        
        if any(issue.rule_id == 'ALG_LINEAR_SEARCH' for issue in algorithm_issues):
            suggestions.append("Use binary search for sorted data or consider using set/dict for O(1) lookups")
        
        if any(issue.rule_id == 'ALG_INEFFICIENT_CONCAT' for issue in algorithm_issues):
            suggestions.append("Use list.extend() or += operator instead of + for list concatenation")
        
        if any(issue.rule_id == 'ALG_MANUAL_SORT' for issue in algorithm_issues):
            suggestions.append("Use built-in sorting functions instead of implementing manual algorithms")
        
        if any(issue.rule_id == 'ALG_STRING_CONCAT' for issue in algorithm_issues):
            suggestions.append("Use str.join() instead of string concatenation in loops")
        
        if any(issue.rule_id == 'ALG_DICT_LOOKUP' for issue in algorithm_issues):
            suggestions.append("Pre-compute dictionary lookups or use defaultdict for better performance")
        
        if any(issue.rule_id == 'ALG_NESTED_COMPREHENSION' for issue in algorithm_issues):
            suggestions.append("Flatten nested comprehensions or use itertools.chain for better readability")
        
        if any(issue.rule_id == 'ALG_FILE_READ' for issue in algorithm_issues):
            suggestions.append("Read entire file once instead of reading in loops")
        
        if any(issue.rule_id == 'ALG_DB_QUERY' for issue in algorithm_issues):
            suggestions.append("Use bulk operations, joins, or batch processing for database queries")
        
        if any(issue.rule_id == 'ALG_NETWORK_REQUEST' for issue in algorithm_issues):
            suggestions.append("Use connection pooling, async requests, or batch API calls")
        
        if any(issue.rule_id == 'ALG_OBJECT_COPY' for issue in algorithm_issues):
            suggestions.append("Reuse objects or use shallow copies instead of deep copying in loops")
        
        if any(issue.rule_id == 'ALG_REGEX_COMPILE' for issue in algorithm_issues):
            suggestions.append("Compile regex patterns once outside the loop for better performance")
        
        if any(issue.rule_id == 'ALG_MANUAL_GROUPING' for issue in algorithm_issues):
            suggestions.append("Use collections.defaultdict(list) instead of manual grouping for better performance")
        
        if any(issue.rule_id == 'ALG_EXPONENTIAL_RECURSION' for issue in algorithm_issues):
            suggestions.append("Use @lru_cache decorator or iterative approach for exponential recursion to achieve O(n) complexity")
        
        if any(issue.rule_id == 'ALG_NESTED_EQUALITY_DUPSCAN' for issue in algorithm_issues):
            suggestions.append("Use set-based duplicate detection instead of nested loops for O(n) complexity")
        
        if any(issue.rule_id == 'PERF_LIST_CONCAT_IN_LOOP' for issue in algorithm_issues):
            suggestions.append("Use list.append() or list.extend() instead of concatenation in loops for better performance")
        
        return suggestions
    
    def _generate_memory_suggestions(self, memory_issues: List[CodeIssue]) -> List[str]:
        """Generate memory management suggestions based on detected issues"""
        suggestions = []
        
        if any(issue.rule_id == 'MEM_CACHE_GROWTH' for issue in memory_issues):
            suggestions.append("Implement LRU cache with size limits or TTL to prevent unbounded growth")
        
        if any(issue.rule_id == 'MEM_EVENT_HANDLERS' for issue in memory_issues):
            suggestions.append("Remove unused event handlers periodically to prevent memory accumulation")
        
        if any(issue.rule_id == 'MEM_LARGE_DATASETS' for issue in memory_issues):
            suggestions.append("Implement data cleanup strategy with TTL or size-based eviction")
        
        if any(issue.rule_id == 'MEM_GLOBAL_GROWTH' for issue in memory_issues):
            suggestions.append("Use bounded data structures or implement cleanup mechanisms for global variables")
        
        if any(issue.rule_id == 'MEM_LARGE_OBJECTS' for issue in memory_issues):
            suggestions.append("Cache or reuse large data structures instead of creating them repeatedly")
        
        if any(issue.rule_id == 'MEM_CLOSURE_CAPTURE' for issue in memory_issues):
            suggestions.append("Avoid capturing large objects in closures - use weak references or explicit cleanup")
        
        if any(issue.rule_id == 'MEM_CACHE_NO_LIMITS' for issue in memory_issues):
            suggestions.append("Use functools.lru_cache or implement custom cache with size limits")
        
        # NEW: Enhanced suggestions for critical memory leaks
        if any(issue.rule_id == 'MEM_LIST_ACCUMULATION' for issue in memory_issues):
            suggestions.append("Implement list rotation, size limits, or periodic cleanup for accumulating lists")
        
        if any(issue.rule_id == 'MEM_FILE_HANDLE_LEAK' for issue in memory_issues):
            suggestions.append("Use context managers (with open()) or ensure file.close() is called")
        
        if any(issue.rule_id == 'MEM_CIRCULAR_REFERENCE' for issue in memory_issues):
            suggestions.append("Break circular references using weak references or explicit cleanup")
        
        if any(issue.rule_id == 'MEM_SESSION_ACCUMULATION' for issue in memory_issues):
            suggestions.append("Implement session expiration, cleanup, or use bounded session storage")
        
        if any(issue.rule_id == 'MEM_INSTANCE_COLLECTION' for issue in memory_issues):
            suggestions.append("Avoid storing all instances - use weak references or remove instances when done")
        
        if any(issue.rule_id == 'MEM_TEMP_STORAGE_LEAK' for issue in memory_issues):
            suggestions.append("Clear temporary storage periodically or use bounded temporary storage")
        
        if any(issue.rule_id == 'MEM_REQUEST_HISTORY_GROWTH' for issue in memory_issues):
            suggestions.append("Implement request history rotation, size limits, or log to external storage")
        
        if any(issue.rule_id == 'MEM_BACKGROUND_TASK_ACCUMULATION' for issue in memory_issues):
            suggestions.append("Clean up completed background tasks or use bounded task queues")
        
        return suggestions
    
    def _generate_general_suggestions(self, code: str) -> List[str]:
        """Generate general code improvement suggestions"""
        suggestions = []
        
        # Check for docstrings
        if 'def ' in code and '"""' not in code and "'''" not in code:
            suggestions.append('Consider adding docstrings to your functions')
        
        # Check for error handling
        if 'def ' in code and 'try:' not in code and 'except' not in code:
            suggestions.append('Consider adding error handling to your functions')
        
        # Check for constants
        if re.search(r'[A-Z_]{3,}', code):
            suggestions.append('Consider using constants for magic numbers and strings')
        
        # Check for async opportunities
        if 'requests.get(' in code or 'requests.post(' in code:
            suggestions.append('Consider using async/await with httpx for better concurrency')
        
        return suggestions
    
    async def _analyze_generic(self, code: str, language: str) -> AnalysisResult:
        """Generic analysis for non-Python languages"""
        lines = code.split('\n')
        lines_of_code = len([line for line in lines if line.strip()])
        
        metrics = CodeMetrics(
            lines_of_code=lines_of_code,
            cyclomatic_complexity=1,  # Simplified
            maintainability_index=75.0,
            function_count=len(re.findall(r'function\s+\w+', code)),
            class_count=len(re.findall(r'class\s+\w+', code)),
            comment_ratio=10.0
        )
        
        issues = []
        suggestions = []
        
        # Basic analysis
        if len(code) > 1000:
            suggestions.append('Consider breaking this code into smaller, more manageable pieces')
        
        if 'TODO' in code or 'FIXME' in code:
            issues.append(CodeIssue(
                type='info',
                message='Code contains TODO or FIXME comments',
                line=1,
                severity='low'
            ))
        
        return AnalysisResult(
            language=language,
            metrics=metrics,
            issues=issues,
            suggestions=suggestions,
            security_issues=[],
            performance_issues=[],
            memory_issues=[],
            code_smell_issues=[],
            async_issues=[],
            api_issues=[],
            data_flow_issues=[],
            dependency_issues=[],
            testing_issues=[],
            algorithm_issues=[]
        )
    
    def _create_default_metrics(self, code: str) -> CodeMetrics:
        """Create default metrics when analysis fails"""
        lines = code.split('\n')
        return CodeMetrics(
            lines_of_code=len(lines),
            cyclomatic_complexity=1,
            maintainability_index=50.0,
            function_count=0,
            class_count=0,
            comment_ratio=0.0
        )
    
    def _create_error_result(self, error_message: str) -> AnalysisResult:
        """Create error result when analysis fails"""
        return AnalysisResult(
            language='unknown',
            metrics=self._create_default_metrics(''),
            issues=[CodeIssue(
                type='error',
                message=f'Analysis failed: {error_message}',
                line=1,
                severity='high'
            )],
            suggestions=['Please check your code syntax and try again'],
            security_issues=[],
            performance_issues=[],
            memory_issues=[],
            code_smell_issues=[],
            async_issues=[],
            api_issues=[],
            data_flow_issues=[],
            dependency_issues=[],
            testing_issues=[],
            algorithm_issues=[]
        )

# Global analyzer instance
code_analyzer = CodeAnalyzer()
